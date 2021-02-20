<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Land;
use App\Http\Resources\Land as LandResource;
use Spatie\QueryBuilder\QueryBuilder;
class LandsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {    
        try{
            $lands = QueryBuilder::for(Land::class)
                                ->allowedFilters(
                                'verified', 'active', 'priority',
                                'category','contract',
                                'status', 'cityGe', 
                                'districtGe', 'streetGe',
                                'agentID', 'agencyID');
            if($request->priceMin){
            $lands = $lands->where('price', '>=', $request->priceMin);
            }
            if($request->priceMax){
            $lands = $lands->where('price', '<=', $request->priceMax);
            }
            if($request->areaMin){
            $lands = $lands->where('area', '>=', $request->areaMin);
            }        
            if($request->areaMax){
            $lands = $lands->where('area', '<=', $request->areaMax);
            }
            return $lands->jsonPaginate(20);
        } catch (Exception $e) {
            return "dd"+$e->getMessage();
        }

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
//
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            $land = new Land;
   
            $land->category = $request->category['value'];
            $land->categoryGe = $request->category['label'];
            $land->contract = $request->contract['value'];
            $land->contractGe = $request->contract['label'];
            $land->price = $request->price;
            $land->currency = $request->currency['value'];
            $land->textGe = $request->textGe ? $request->textGe : null;
            $land->textEn = $request->textEn ? $request->textEn : null;
            $land->textRu = $request->textRu ? $request->textRu : null;
            $land->city = $request->city['value'];
            $land->cityGe = $request->city['label'];
            $land->district = $request->district ? $request->district['value']: null;
            $land->districtGe = $request->district ? $request->district['label']: null;
            $land->street = $request->street ? $request->street['value'] : null;
            $land->streetGe = $request->street ? $request->street['label'] : null;
            $land->address = $request->address ? $request->address : null;
            
            $land->area = $request->area;
            $land->status = $request->status['value'];
            $land->statusGe = $request->status['label'];
            
            $land->agentID = $request->agentID;
            $land->agencyID = $request->agencyID;
            $land->cadastral = $request->cadastral ? $request->cadastral : null;
            $land->owner = $request->owner;
            $land->ownerNum = $request->ownerNum;
            $land->comment = $request->comment ? $request->comment : null;
            $land->active = $request->active;
            $land->priority = $request->priority;
            $land->verified = $request->verified;
            $land->save();
    
            return $land->id;
        }catch (Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $land = Land::find($id);
        return $land;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try{
            $land = Land::find($id);
            if($request->images && !($request->has('priority')) ){
                if($request->images != "" || $request->images != null ){
                    $land->images = json_encode($request->images);
                };
            }elseif (!($request->has('priority'))){

                if( $request->filled('active') ){
                    $land->active =  $request->active;
                };
                if( $request->filled('verified')){
                    $land->verified = $request->verified;
                };
            }
            else{
                if($request->images != "" || $request->images != null ){
                    $land->images = json_encode($request->images);
                }
                $land->category = $request->category['value'];
                $land->categoryGe = $request->category['label'];
                $land->contract = $request->contract['value'];
                $land->contractGe = $request->contract['label'];
                $land->price = $request->price;
                $land->currency = $request->currency['value'];
                $land->textGe = $request->textGe ? $request->textGe : null;
                $land->textEn = $request->textEn ? $request->textEn : null;
                $land->textRu = $request->textRu ? $request->textRu : null;
                $land->city = $request->city['value'];
                $land->cityGe = $request->city['label'];
                $land->district = $request->district ? $request->district['value']: null;
                $land->districtGe = $request->district ? $request->district['label']: null;
                $land->street = $request->street ? $request->street['value'] : null;
                $land->streetGe = $request->street ? $request->street['label'] : null;
                $land->address = $request->address ? $request->address : null;
                
                $land->area = $request->area;
                $land->status = $request->status['value'];
                $land->statusGe = $request->status['label'];
                
                $land->agentID = $request->agentID;
                $land->agencyID = $request->agencyID;
                $land->cadastral = $request->cadastral ? $request->cadastral : null;
                $land->owner = $request->owner;
                $land->ownerNum = $request->ownerNum;
                $land->comment = $request->comment ? $request->comment : null;
                $land->active = $request->active;
                $land->priority = $request->priority;
                $land->verified = $request->verified;
            }
            
            $land->save();

            return  $land->id;
        } catch (Exception $e) {
            return $e->getMessage();
        }
        // try{
        // $land = Land::find($id);
        // $land->images = json_encode($request->images);
        // $land->save();
        // return $land;
        // }
        // catch (Exception $e) {
        //     return $e->getMessage();
        // }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $land = Land::find($id);
        $land->delete();
        return 'yey';
    }
}
