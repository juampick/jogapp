<?php

use App\Models\TimeEntry;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->call(UserTableSeeder::class);
        $this->call(TimeEntryTableSeeder::class);

        Model::reguard();
    }
}

class UserTableSeeder extends Seeder {
    public function run()
    {
        DB::table('users')->delete();

        $users = array(
            ['name' => 'Juan Cook', 'email' => 'juampick@gmail.com', 'password' => Hash::make('toptal')],
            ['name' => 'SuperAdmin', 'email' => 'admin@toptal.com', 'password' => Hash::make('toptal')],
            ['name' => 'Generic User', 'email' => 'generic@user.com', 'password' => Hash::make('toptal')],
        );

        // Loop through each user above and create the record for them in the database
        foreach ($users as $user)
        {
            User::create($user);
        }
    }
}

class TimeEntryTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('time_entries')->delete();

        $timesEntries = array(
            ['date' => new DateTime(), 'distance' => '10.10', 'time' => '00:14:31', 'user_id' => 1],
            ['date' => new DateTime(), 'distance' => '10.50', 'time' => '00:13:31', 'user_id' => 1],
            ['date' => new DateTime(), 'distance' => '05.43', 'time' => '00:12:31', 'user_id' => 1],
            ['date' => new DateTime(), 'distance' => '10.10', 'time' => '00:12:31', 'user_id' => 1],
            ['date' => new DateTime(), 'distance' => '3.03', 'time' => '00:10:31', 'user_id' => 1],
            ['date' => new DateTime(), 'distance' => '10.10', 'time' => '00:54:31', 'user_id' => 1],
            ['date' => new DateTime(), 'distance' => '9.78', 'time' => '01:02:31', 'user_id' => 1],
            ['date' => new DateTime(), 'distance' => '8.32', 'time' => '01:23:31', 'user_id' => 1],
            ['date' => new DateTime(), 'distance' => '10.10', 'time' => '00:23:31', 'user_id' => 1],
            ['date' => new DateTime(), 'distance' => '5.34', 'time' => '00:35:31', 'user_id' => 1],
            ['date' => new DateTime(), 'distance' => '04.54', 'time' => '00:35:31', 'user_id' => 2],
            ['date' => new DateTime(), 'distance' => '10.10', 'time' => '00:23:31', 'user_id' => 2],
            ['date' => new DateTime(), 'distance' => '54.31', 'time' => '02:50:00', 'user_id' => 2],
            ['date' => new DateTime(), 'distance' => '05.15', 'time' => '00:23:31', 'user_id' => 2],
            ['date' => new DateTime(), 'distance' => '10.10', 'time' => '00:23:31', 'user_id' => 2]
        );

        // Loop through each user above and create the record for them in the database
        foreach ($timesEntries as $timeEntry) {
            TimeEntry::create($timeEntry);
        }
    }
}
