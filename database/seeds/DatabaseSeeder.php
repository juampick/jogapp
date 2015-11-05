<?php

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
