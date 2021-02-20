<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLands extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lands', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->text('category')->nullable();
            $table->text('categoryGe')->nullable();
            $table->text('contract')->nullable();
            $table->text('contractGe')->nullable();
            $table->float('price')->nullable();
            $table->text('currency')->nullable();
            $table->mediumText('textGe')->nullable();
            $table->mediumText('textEn')->nullable();
            $table->mediumText('textRu')->nullable();
            $table->text('city')->nullable();
            $table->text('cityGe')->nullable();
            $table->text('district')->nullable();
            $table->text('districtGe')->nullable();
            $table->text('street')->nullable();
            $table->text('streetGe')->nullable();
            $table->text('address')->nullable();
            $table->float('area')->nullable();
            $table->text('status')->nullable();
            $table->text('statusGe')->nullable();
            $table->mediumText('mainImg')->nullable();
            $table->mediumText('images')->nullable();
            $table->double('lat')->nullable();
            $table->double('lng')->nullable();
            $table->text('agentID')->nullable();
            $table->text('agencyID')->nullable();
            $table->text('cadastral')->nullable();
            $table->text('owner')->nullable();
            $table->text('ownerNum')->nullable();
            $table->text('comment')->nullable();
            $table->integer('active')->nulllable();
            $table->integer('priority')->nullable();
            $table->integer('verified')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lands');
    }
}
