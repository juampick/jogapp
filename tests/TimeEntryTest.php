<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class TimeEntryTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testTimeEntryGet()
    {
        $this->withoutMiddleware();

        $this->get('/api/v1/time', ['name' => 'Sally'])
            ->seeJson([

            ]);
    }
}
