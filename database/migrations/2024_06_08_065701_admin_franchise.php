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
            $table->unsignedBigInteger('id_admin');
            $table->unsignedBigInteger('id_franchise');
            $table->primary(['id_admin', 'id_franchise']);
        });

        Schema::table('admin_franchise', function (Blueprint $table) {
            $table->foreign('id_admin')->references('id')->on('users');
            $table->foreign('id_franchise')->references('id')->on('franchises');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists("admin_franchise");
    }
};
