<?php

namespace App\Http\Controllers;

use App\Models\TimeEntry;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class ReportController extends Controller
{
    public function __construct()
    {
        //$this->middleware('jwt.auth');
    }

    public function getReport($id)
    {

        //Report on average speed & distance per week

        $aTimeEntries = User::find($id)->timeEntries;

        $avgSpeedSums = 0;
        $distanceSum = 0;
        $iQuantity = count($aTimeEntries);
        foreach ($aTimeEntries as $timeEntry){
            $hours = null;
            $minutes = null;
            $seconds = null;

            sscanf($timeEntry->time, "%d:%d:%d", $hours, $minutes, $seconds); //Parsing the formatted string: HH:mm:ss to splitted into parts
            $timeInSeconds = isset($seconds) ? $hours * 3600 + $minutes * 60 + $seconds : $hours;
            $timeInHours = $timeInSeconds / 3600;

            $avgSpeed = $timeEntry->distance / $timeInHours;

            $avgSpeedSums += $avgSpeed;
            $distanceSum += $timeEntry->distance;
        }

        $finalAverageSpeed = $avgSpeedSums / $iQuantity;
        $finalAverageDistance = $distanceSum / $iQuantity;

        //ToDo: this is all in total.. (genearl... we have to divided into weeks... )
        return response()->json(['distanceAvg' => $finalAverageDistance, 'speedAvg' => $finalAverageSpeed]);
    }
}
