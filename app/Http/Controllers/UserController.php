<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\TimeEntry;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator;

class UserController extends Controller
{

    public function __construct()
    {
       $this->middleware('jwt.auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (Auth::user()->hasRole('user')){
            return response()->json(['error' => 'You are not allowed to see this'], 405);
        }

        $users = [];
        if (Auth::user()->hasRole('admin')){
            $allUsers =  User::all();
            foreach ($allUsers as $user){
                if (Auth::user()->id != $user->id) { //Remove the currentUser
                    $user->role = $user->roles->first()->display_name;
                    unset($user->roles);
                    $users[] = $user;
                }
            }
        } else if (Auth::user()->hasRole('user_manager')){
            $allUsers =  User::all(); //I need to get all the users but only the ones that are 'users';
            foreach ($allUsers as $user){
                if (Auth::user()->id != $user->id) { //Remove the currentUser
                    if ($user->hasRole('user')) {
                        $user->role = $user->roles->first()->display_name;
                        unset($user->roles);
                        $users[] = $user;
                    }
                }
            }
        }

        return $users;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (Auth::user()->hasRole('user')){
            return response()->json(['error' => 'You are not allowed to do this action'], 405);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'confirmPassword' => 'required|same:password',
            'role' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'invalid_data'], 422);
        }

        $userData = $request->only('name', 'email', 'password');
        $roleName = $request->input('role');

        if (Auth::user()->hasRole('user_manager') &&
            ($roleName == 'user_manager' || $roleName == 'admin')){
                return response()->json(['error' => 'You are not allowed to do this action'], 405);
        }

        $userData['password'] =  Hash::make($userData['password']); //We do the hash of the password
        try {
            $user = User::create($userData);
            //Assign a role to that user
            $role = Role::where('name', '=', $roleName)->first();

            $user->attachRole($role);

        } catch (Exception $e) {
            return response()->json(['error' => 'User already exists.'], \Illuminate\Http\Response::HTTP_CONFLICT);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (!Auth::user()->hasRole('admin')){
            return response()->json(['error' => 'You are not allowed to do this action'], 405);
        }

        $userToDelete = User::where('id', $id)->get()->first();

        if ($userToDelete){
            if (Auth::user()->hasRole('user_manager') && ($userToDelete->hasRole('user_manager') || $userToDelete->hasRole('admin'))){
                return response()->json(['error' => 'You are not allowed to do this action'], 405);
            }
        }

        try {
            User::destroy($id);
        } catch (Exception $e){
            return response()->json(['error' => 'There was an error deleting your User'], 405);
        }

        return $userToDelete;
    }
}
