<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('menus', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_franchise');
            $table->string('name');
            $table->string('description');
            $table->boolean('availability');
            $table->enum('type', ['food', 'beverage']);
            $table->timestamps();
        });

        Schema::table('menus', function (Blueprint $table) {
            $table->foreign('id_franchise')->references('id')->on('franchises')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('menus');
    }
};
