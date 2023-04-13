<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;




class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    { 
        $imageUrl = asset('/storage/product/images/');
        $produk = Product::latest()->get();
        return response()->json([
            'imageUrl' => $imageUrl,
            'produk'=> $produk
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       $request->validate([
        'nama' => 'required',
        'gambar' => 'required | image',
        'harga' => 'required'
       ]);
       try {
        $imageName = Str::random().'.'.$request->gambar->getClientOriginalExtension();
        Log::channel('stderr')->info($imageName);
        Storage::disk('public')->putFileAs('product/images', $request->gambar, $imageName);
        Product::create($request->post()+['gambar'=> $imageName]);
        return response()->json([
            'message'=>'Produk berhasil ditambahkan'
        ]);
       } catch (Exception $e) {
        Log::error($e->getMessage());
        return response()->json([
            'message' => 'Terjadi kesalahan'
        ], 500);
       }
    }

    /**
     * Display the specified resource.
     */
    public function show(Produk $produk)
    {
        return response()->json([
            'produk' => $produk
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $req, $id)
    {
        $req->validate([
            'nama' => 'required',
            'gambar' => 'nullable',
            'harga' => 'required'
           ]);
           $produk = Product::findOrFail($id);
           $produk->fill($req->post())->update();
           try {
               Log::channel('stderr')->info($req->hasFile('gambar'));
               if($req->hasFile('gambar')) {
                   if($produk->gambar) {
                       $exists = Storage::disk('public')->exists("product/images/{$produk->gambar}");
                       if($exists) {
                           Storage::disk('public')->delete("product/images/{$produk->gambar}");
                        }
                    }
                    $imageName = Str::random().'.'.$req->gambar->getClientOriginalExtension();
                    Storage::disk('public')->putFileAs('product/images', $req->gambar, $imageName);
                    $produk->gambar = $imageName;
                    $produk->save();
                }
                return response()->json([
                    'message'=>'Produk berhasil diupdate'
                ]);
           }catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message'=>'Terjadi kesalahan pada update'
            ], 500);
           }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $produk, $id)
    {

        try {
            if($produk->gambar) {
                $exists = Storage::disk('public')->exists("product/images/{$produk->gambar}");
                if($exists) {
                    Storage::disk('public')->delete("product/images/{$produk->gambar}");
                }
            }

            $deleteProduct = Product::findOrFail($id);
            $deleteProduct->delete();
            return response()->json([
                'message'=>'Produk berhasil dihapus'
            ]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message'=>'Terjadi kesalahan pada update'
            ], 500);
        }
    }
}
