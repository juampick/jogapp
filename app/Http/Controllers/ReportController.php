<?php

namespace App\Http\Controllers;

use App\Models\TimeEntry;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ReportController extends Controller
{
    public function __construct()
    {
//        $this->middleware('jwt.auth');
    }

    /**
     * Report on Average Speed & Distance per Week
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getReport($userId)
    {
        $user = Auth::user();
        if (isset($user) && ($user->id != $userId)) {
            return response()->json(['error' => 'You are not allowed to see this']);
        }

        $cTimeEntries = TimeEntry::where('user_id', $userId)->select('date', 'distance', 'time')->get();

        if ($cTimeEntries->isEmpty()) {
            return response()->json('no records');
        }

        foreach ($cTimeEntries as $timeEntry) {
            $hours = null;
            $minutes = null;
            $seconds = null;

            $timeEntry->distance = doubleval($timeEntry->distance);

            sscanf($timeEntry->time, "%d:%d:%d", $hours, $minutes, $seconds); //Parsing the formatted string: HH:mm:ss to splitted into parts
            $timeInSeconds = isset($seconds) ? $hours * 3600 + $minutes * 60 + $seconds : $hours;
            $timeInHours = $timeInSeconds / 3600;

            $avgSpeed = $timeEntry->distance / $timeInHours;

            $carbonDate = Carbon::createFromFormat('Y-m-d H:i:s', $timeEntry->date);
            $weekOfYear = $carbonDate->weekOfYear;
            $weekYear = $carbonDate->year . $weekOfYear;

            $timeEntry->avgSpeed = $avgSpeed;
            $timeEntry->weekYear = $weekYear;
        }

        $aTimeEntriesGroupedByWeek = $cTimeEntries->groupBy('weekYear');

        $aResultsByWeek = [];
        foreach ($aTimeEntriesGroupedByWeek as $timeEntryWeekKey => $timeEntryWeekValue) {
            $aResultsByWeek[$timeEntryWeekKey]['avgSpeedSums'] = $timeEntryWeekValue->avg('avgSpeed');
            $aResultsByWeek[$timeEntryWeekKey]['avgDistance'] = $timeEntryWeekValue->avg('distance');
        }

//        return response()->json(['items' => $aTimeEntriesGroupedByWeek, 'results' => $aResultsByWeek]);
        return response()->json(['results' => $aResultsByWeek]);
    }
}
