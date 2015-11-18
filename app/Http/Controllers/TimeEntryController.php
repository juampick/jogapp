<?php

namespace App\Http\Controllers;

use App\Models\TimeEntry;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Validator;

class TimeEntryController extends Controller
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
        $user = Auth::user();
        $timeEntries = TimeEntry::where('user_id', $user->id)->select('id', 'date', 'distance', 'time')->get();

        foreach ($timeEntries as &$timeEntry){
            $timeEntry->distance = doubleval($timeEntry->distance);
        }

        return $timeEntries;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
            'distance' => 'required|numeric',
            'time' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'invalid_data'], 422);
        }

        $userId = $request->input('user_id');
        $user = User::find($userId);

        if (Auth::user()->id != $userId){
            if (Auth::user()->hasRole('user')){
                return response()->json(['error' => 'You are not allowed to do this action'], 405);
            } else if (Auth::user()->hasRole('user_manager') && (($user->hasRole('user_manager') || ($user->hasRole('admin'))))){
                return response()->json(['error' => 'You are not allowed to do this action'], 405);
            }
        }

        $timeEntry = TimeEntry::create($request->all());

        return $timeEntry;
    }

    /**
     * Display the timeEntries of specific User only
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);

        if (Auth::user()->id != $id){
            if (Auth::user()->hasRole('user')){
                return response()->json(['error' => 'You are not allowed to do this action'], 405);
            } else if (Auth::user()->hasRole('user_manager') && (($user->hasRole('user_manager') || ($user->hasRole('admin'))))){
                return response()->json(['error' => 'You are not allowed to do this action'], 405);
            }
        }

        return User::find($id)->timeEntries;

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
        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
            'distance' => 'required|numeric',
            'time' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'invalid_data'], 422);
        }

        $timeEntry = TimeEntry::find($id);

        if (Auth::user()->id != $timeEntry->user_id){
            if (Auth::user()->hasRole('user')){
                return response()->json(['error' => 'You are not allowed to do this action'], 405);
            } else if (Auth::user()->hasRole('user_manager') && (($timeEntry->user->hasRole('user_manager') || ($timeEntry->user->hasRole('admin'))))){
                return response()->json(['error' => 'You are not allowed to do this action'], 405);
            }
        }

        if (isset($timeEntry)){
            $timeEntry->date = $request->input('date');
            $timeEntry->distance = $request->input('distance');
            $timeEntry->time = $request->input('time');
            $timeEntry->save();
        }
        return $timeEntry;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $timeEntry = TimeEntry::find($id);

        if (Auth::user()->id != $timeEntry->user_id){
            if (Auth::user()->hasRole('user')){
                return response()->json(['error' => 'You are not allowed to do this action'], 405);
            } else if (Auth::user()->hasRole('user_manager') && (($timeEntry->user->hasRole('user_manager') || ($timeEntry->user->hasRole('admin'))))){
                return response()->json(['error' => 'You are not allowed to do this action'], 405);
            }
        }

        return TimeEntry::destroy($id);
    }
}
