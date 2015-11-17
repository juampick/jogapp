<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;
use Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthenticateController extends Controller
{

    public function __construct()
    {
        $this->middleware('jwt.auth', ['except' => ['authenticate', 'signUp']]);
    }

    public function authenticate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'invalid_data'], 422);
        }

        $credentials = $request->only('email', 'password');

        //Role check
        $user = User::where('email', '=', $credentials['email'])->first();

        try {
            $customClaims = [];
            if (isset($user)){
                $customClaims = ['role' => $user->roles->first()->name];
            }
            // verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials, $customClaims)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        // if no errors are encountered we can return a JWT
        return response()->json(compact('token'));
    }

    public function signUp(Request $request){

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

        $userData['password'] =  Hash::make($userData['password']); //We do the hash of the password
        try {
            $user = User::create($userData);
            //Asign a role to that user
            $role = Role::where('name', '=', $roleName)->first();

            $user->attachRole($role);

        } catch (Exception $e) {
            return response()->json(['error' => 'User already exists.'], \Illuminate\Http\Response::HTTP_CONFLICT);
        }

        //Role check
        $customClaims = ['role' => $user->roles->first()->name];
        $token = JWTAuth::fromUser($user, $customClaims);

        return response()->json(compact('token'));
    }

    public function getAuthenticatedUser()
    {
        try {

            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }

        } catch (TokenExpiredException $e) {

            return response()->json(['token_expired'], $e->getStatusCode());

        } catch (TokenInvalidException $e) {

            return response()->json(['token_invalid'], $e->getStatusCode());

        } catch (JWTException $e) {

            return response()->json(['token_absent'], $e->getStatusCode());

        }

        //Get Role
        $user->role = $user->roles->first()->name;
        unset($user->roles);

        // the token is valid and we have found the user via the sub claim
        return response()->json(compact('user'));
    }

    public function changePwd(Request $request){
        echo 'hello'; die;
        $user = Auth::user();
        if ($user) {
            $user->password = Hash::make($request->input('newPassword'));
            return $user->save();
        }
    }

}
