<?php
/**
 * Created by PhpStorm.
 * User: juan.cook
 * Date: 09/11/15
 * Time: 11:18
 */

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class TimeEntry extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'email', 'password', 'role'];


    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }


}