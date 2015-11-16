<?php

use App\Models\Permission;
use App\Models\Role;
use App\Models\TimeEntry;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

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
        $this->call(RoleTableSeeder::class);

        Model::reguard();
    }
}

class UserTableSeeder extends Seeder {
    public function run()
    {
        DB::table('users')->delete();

        $users = array(
            ['name' => 'Juan Cook', 'email' => 'juampick@gmail.com', 'password' => Hash::make('toptal')],
            ['name' => 'User Manager', 'email' => 'usermanager@toptal.com', 'password' => Hash::make('toptal')],
            ['name' => 'Admin', 'email' => 'admin@toptal.com', 'password' => Hash::make('toptal')],
            ['name' => 'Luis Filipe Teófilo', 'email' => 'luis.filipe@toptal.com', 'password' => Hash::make('toptal')],
            ['name' => 'Luis Filipe Teófilo UM', 'email' => 'luis.filipe_um@toptal.com', 'password' => Hash::make('toptal')],
            ['name' => 'Luis Filipe Teófilo Admin', 'email' => 'luis.filipe_admin@toptal.com', 'password' => Hash::make('toptal')],
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
            ['date' => Carbon::now()->format('Y-m-d'), 'distance' => '10.10', 'time' => '00:14:31', 'user_id' => 1],
            ['date' => Carbon::now()->format('Y-m-d'), 'distance' => '10.50', 'time' => '00:13:31', 'user_id' => 1],
            ['date' => Carbon::now()->format('Y-m-d'), 'distance' => '05.43', 'time' => '00:12:31', 'user_id' => 1],
            ['date' => Carbon::now()->format('Y-m-d'), 'distance' => '10.10', 'time' => '00:12:31', 'user_id' => 1],
            ['date' => Carbon::now()->format('Y-m-d'), 'distance' => '3.03', 'time' => '00:10:31', 'user_id' => 1],
            ['date' => Carbon::createFromDate(2015, 10, 10)->format('Y-m-d'), 'distance' => '10.10', 'time' => '00:54:31', 'user_id' => 1],
            ['date' => Carbon::createFromDate(2015, 10, 15)->format('Y-m-d'), 'distance' => '9.78', 'time' => '01:02:31', 'user_id' => 1],
            ['date' => Carbon::createFromDate(2015, 10, 1)->format('Y-m-d'), 'distance' => '8.32', 'time' => '01:23:31', 'user_id' => 1],
            ['date' => Carbon::createFromDate(2015, 10, 19)->format('Y-m-d'), 'distance' => '10.10', 'time' => '00:23:31', 'user_id' => 1],
            ['date' => Carbon::createFromDate(2015, 10, 10)->format('Y-m-d'), 'distance' => '5.34', 'time' => '00:35:31', 'user_id' => 1],
            ['date' => Carbon::createFromDate(2015, 10, 25)->format('Y-m-d'), 'distance' => '04.54', 'time' => '00:35:31', 'user_id' => 2],
            ['date' => Carbon::createFromDate(2015, 9, 14)->format('Y-m-d'), 'distance' => '10.10', 'time' => '00:23:31', 'user_id' => 2],
            ['date' => Carbon::createFromDate(2015, 9, 11)->format('Y-m-d'), 'distance' => '54.31', 'time' => '02:50:00', 'user_id' => 2],
            ['date' => Carbon::createFromDate(2015, 8, 19)->format('Y-m-d'), 'distance' => '05.15', 'time' => '00:23:31', 'user_id' => 2],
            ['date' => Carbon::createFromDate(2015, 10, 29)->format('Y-m-d'), 'distance' => '10.10', 'time' => '00:54:46', 'user_id' => 2],
            ['date' => Carbon::createFromDate(2015, 6, 30)->format('Y-m-d'), 'distance' => '10.10', 'time' => '00:54:31', 'user_id' => 1],
            ['date' => Carbon::createFromDate(2015, 5, 8)->format('Y-m-d'), 'distance' => '9.78', 'time' => '01:02:31', 'user_id' => 1],
            ['date' => Carbon::createFromDate(2015, 10, 14)->format('Y-m-d'), 'distance' => '8.32', 'time' => '01:23:31', 'user_id' => 1],
            ['date' => Carbon::createFromDate(2015, 10, 10)->format('Y-m-d'), 'distance' => '10.10', 'time' => '00:54:46', 'user_id' => 1],
            ['date' => Carbon::createFromDate(2015, 10, 8)->format('Y-m-d'), 'distance' => '5.34', 'time' => '00:35:31', 'user_id' => 1],
            ['date' => Carbon::createFromDate(2015, 11, 14)->format('Y-m-d'), 'distance' => '04.54', 'time' => '00:35:31', 'user_id' => 3],
            ['date' => Carbon::createFromDate(2015, 11, 13)->format('Y-m-d'), 'distance' => '9.4', 'time' => '00:54:46', 'user_id' => 3],
            ['date' => Carbon::createFromDate(2015, 9, 10)->format('Y-m-d'), 'distance' => '54.31', 'time' => '02:50:00', 'user_id' => 2],
            ['date' => Carbon::createFromDate(2015, 9, 11)->format('Y-m-d'), 'distance' => '05.15', 'time' => '00:54:46', 'user_id' => 2],
            ['date' => Carbon::createFromDate(2015, 9, 2)->format('Y-m-d'), 'distance' => '9.4', 'time' => '00:54:46', 'user_id' => 4],
            ['date' => Carbon::createFromDate(2015, 9, 3)->format('Y-m-d'), 'distance' => '9.4', 'time' => '00:54:31', 'user_id' => 4],
            ['date' => Carbon::createFromDate(2015, 9, 4)->format('Y-m-d'), 'distance' => '9.78', 'time' => '01:02:31', 'user_id' => 1],
            ['date' => Carbon::createFromDate(2015, 9, 6)->format('Y-m-d'), 'distance' => '8.32', 'time' => '01:23:31', 'user_id' => 1],
            ['date' => Carbon::createFromDate(2015, 8, 15)->format('Y-m-d'), 'distance' => '9.4', 'time' => '00:54:46', 'user_id' => 4],
            ['date' => Carbon::createFromDate(2015, 8, 17)->format('Y-m-d'), 'distance' => '5.34', 'time' => '00:35:31', 'user_id' => 1],
            ['date' => Carbon::createFromDate(2015, 11, 10)->format('Y-m-d'), 'distance' => '04.54', 'time' => '00:35:31', 'user_id' => 2],
            ['date' => Carbon::createFromDate(2015, 9, 15)->format('Y-m-d'), 'distance' => '10.10', 'time' => '00:23:31', 'user_id' => 2],
            ['date' => Carbon::createFromDate(2015, 8, 7)->format('Y-m-d'), 'distance' => '54.31', 'time' => '02:50:00', 'user_id' => 2],
            ['date' => Carbon::createFromDate(2015, 8, 24)->format('Y-m-d'), 'distance' => '05.15', 'time' => '00:23:31', 'user_id' => 2],
            ['date' => Carbon::createFromDate(2015, 10, 23)->format('Y-m-d'), 'distance' => '10.10', 'time' => '00:23:31', 'user_id' => 2]
        );

        // Loop through each user above and create the record for them in the database
        foreach ($timesEntries as $timeEntry) {
            TimeEntry::create($timeEntry);
        }
    }
}

class RoleTableSeeder extends Seeder
{
    public function run()
    {
        /*
        Types of Roles:
            user            => common user: CRUD timeEntries (yours)
            user_manager    => user that can CRUD users and CRUD timeEntries (from all user (common ones))
            admin           => user that can CRUD users and CRUD timeEntries (from all users (all types)... user/user_manager and admin)
        */

        # Creating Roles #
        $userRole = new Role();
        $userRole->name = 'user';
        $userRole->display_name = 'User';
        $userRole->save();

        $userManagerRole = new Role;
        $userManagerRole->name = 'user_manager';
        $userManagerRole->display_name = 'User Manager';
        $userManagerRole->save();

        $adminRole = new Role;
        $adminRole->name = 'admin';
        $adminRole->display_name = 'Admin';
        $adminRole->save();

        # Assign Roles to Users #
        //Find Users
        $userJuampick = User::where('email', '=', 'juampick@gmail.com')->first();
        $userManager = User::where('email', '=', 'usermanager@toptal.com')->first();
        $userAdmin = User::where('email', '=', 'admin@toptal.com')->first();
        $userLuis = User::where('email', '=', 'luis.filipe@toptal.com')->first();
        $userLuisManager = User::where('email', '=', 'luis.filipe_um@toptal.com')->first();
        $userLuisAdmin = User::where('email', '=', 'luis.filipe_admin@toptal.com')->first();

        //Asign Roles to Users
        $userJuampick->attachRole($userRole);
        $userManager->attachRole($userManagerRole);
        $userAdmin->attachRole($userAdmin);
        $userLuis->attachRole($userRole);
        $userLuisManager->attachRole($userManagerRole);
        $userLuisAdmin->attachRole($userAdmin);
    }
}