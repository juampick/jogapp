<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

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
            return response()->json(['error' => 'You are not allowed to see this']);
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
            $allUsers =  User::all(); //I need toget all the users but only the ones that are 'users';
            foreach ($allUsers as $user){
                if (Auth::user()->id != $user->id) { //Remove the currentUser
                    if ($user->hasRole('user')) {
                        $user->role = $user->roles->first()->name;
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
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
            return response()->json(['error' => 'You are not allowed to do this action']);
        }

        return User::destroy($id);
    }
}
