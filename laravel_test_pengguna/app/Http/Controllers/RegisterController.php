<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(), [
            'username' => "required|unique:username",
            'fullname' => "required",
            'city' => "required",
            'status' => "required",
            
        ]);

        if ($validator->fails()) {
            return response()->json([
                "message" => "Failed creating a new user",
                "errors" => $validator->errors()
            ], Response::HTTP_NOT_ACCEPTABLE);
        }

        $validated = $validator->validate();

        try {
            $user_id = User::findOrFail($id);
            $user_id->update($validated);
        } catch (Exception $error) {
            return response()->json(
                [
                    'message' => 'Failed upda-ting a new user',
                    'error' => $error->getMessage()
                ]
            );
        }

        return response()->json(
            [
                'message' => 'Successfully updated a user',
                'data' => $user_id
            ]
        );
    } 

    public function destroy($id)
    {
        $user_id = User::findOrFail($id);
        $user_id->delete();

        return response()->json(
            [
                'message' => "Successfully deleted as user with id {$id}" ,
            ]
        );
    }
}
