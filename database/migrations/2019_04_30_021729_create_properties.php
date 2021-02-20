<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProperties extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('properties', function (Blueprint $table) {
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
            $table->float('yard')->nullable();
            $table->text('status')->nullable();
            $table->text('statusGe')->nullable();
            $table->text('quality')->nullable();
            $table->text('qualityGe')->nullable();
            $table->integer('rooms')->nullable();
            $table->integer('bedrooms')->nullable();
            $table->integer('bathrooms')->nullable();
            $table->integer('floor')->nullable();
            $table->integer('floors')->nullable();
            $table->float('balcony')->nullable();
            //$table->float('eBalcony')->nullable();
            $table->float('veranda')->nullable();
           // $table->float('eVeranda')->nullable();
            $table->float('loggia')->nullable();
            //$table->integer('eLoggia')->nullable();
            $table->float('ceiling')->nullable();
            $table->text('parking')->nullable();
            $table->text('parkingGe')->nullable();
            $table->text('heating')->nullable();
            $table->text('heatingGe')->nullable();
            $table->text('hotWater')->nullable();
            $table->text('hotWaterGe')->nullable();
            $table->text('storeroom')->nullable();
            $table->text('storeroomGe')->nullable();
            $table->integer('conditioner')->nullable();
            $table->integer('telephone')->nullable();
            $table->integer('furniture')->nullable();
            $table->integer('elevator')->nullable();
            $table->integer('internet')->nullable();
            $table->integer('electonics')->nullable();
            $table->integer('television')->nullable();
            $table->integer('fireplace')->nullable();
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
            $table->integer('active')->default(0);
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
        Schema::dropIfExists('properties');
    }
}
