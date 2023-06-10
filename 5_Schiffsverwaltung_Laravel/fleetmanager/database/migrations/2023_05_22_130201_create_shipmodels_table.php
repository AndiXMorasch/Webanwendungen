<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shipmodels', function (Blueprint $table) {
            $table->id();
            $table->integer('manufacturer_id')->nullable()->unsigned();
            $table->string('name')->default('');
            $table->timestamps();
        });

        Schema::table('ships', function (Blueprint $table) {
            $table->integer('shipmodel_id')->nullable()->unsigned()->after('id');
        });
        // Shipmodel
        // shipmodels
        // shipmodel_id
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ships', function (Blueprint $table) {
            $table->dropColumn('shipmodel_id');
        });

        Schema::dropIfExists('shipmodels');
    }
};
