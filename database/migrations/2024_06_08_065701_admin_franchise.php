<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create("admin_franchise", function (Blueprint $table) {
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('franchise_id');
            $table->primary(['user_id', 'franchise_id']);
        });

        Schema::table('admin_franchise', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('franchise_id')->references('id')->on('franchises');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists("admin_franchise");
    }
};
