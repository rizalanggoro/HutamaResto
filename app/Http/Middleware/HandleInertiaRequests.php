<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Storage;

class HandleInertiaRequests extends Middleware {
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array {
        $user = $request->user();
        if ($user->image)
            $user->image = Storage::disk('public')->url($user->image);
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
            ],
        ];
    }
}
