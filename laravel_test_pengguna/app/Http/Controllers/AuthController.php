<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'username' => "required|unique:users,username",
            'fullname' => "required",
            'city' => "required",
            'status' => "required",
            'password' => "required",
        ]);

        if ($validator->fails()) {
            return response()->json([
                "message" => "Failed creating a new user",
                "errors" => $validator->errors()
            ], Response::HTTP_NOT_ACCEPTABLE);
        }

        $validated = $validator->validate();
        $validated['password'] = bcrypt($validated['password']);

        try {
            $createdUser = User::create($validated);
        } catch (Exception $error) {
            return response()->json(
                [
                    'message' => 'Failed creating a new user',
                    'error' => $error->getMessage()
                ]
            );
        }

        return response()->json(
            [
                'message' => 'Successfully creating a user',
                'data' => $createdUser
            ]
        );
    }
    
    public function login(Request $request)
    {

        $request->validate([
            'username' => 'required',
            'password' => 'required'
        ]);

        $users = User::firstWhere('username', $request->username);

        if (!$users || !Hash::check($request->password, $users->password)) {
            return response()->json(["message " => "Bad Credentials"],
            Response::HTTP_NOT_ACCEPTABLE);
        } 

        $token = $users->createToken("sanctum_token")->plainTextToken;

        return response()->json(
            [
                'message' => 'Successfully logged in',
                'token' => $token
            ],Response::HTTP_OK
        );
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json(
            [
                'message' => 'Successfully logged out'
            ],Response::HTTP_OK
        );
    }

    public function getUser()
    {
        return response()->json(
            [
                'user' => auth()->user()
            ],Response::HTTP_OK
        );
    }
}
