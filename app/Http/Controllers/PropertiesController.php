<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Property;
use App\Http\Resources\Property as PropertyResource;
use Spatie\QueryBuilder\QueryBuilder;
class PropertiesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try{
            //where('active',1)
         $property = QueryBuilder::for(Property::class)
                     ->allowedFilters(
                        'verified', 'active', 'priority',
                        'category','contract',
                        'status', 'condition',
                        'cityGe', 'districtGe', 'streetGe',
                        'heating', 'hotWater',
                        'parking', 'storeroom',
                        'agentID', 'agencyID');      
        if($request->priceMin){
            $property = $property->where('price', '>=', $request->priceMin);
        }
        if($request->priceMax){
            $property = $property->where('price', '<=', $request->priceMax);
        }
        if($request->areaMin){
            $property = $property->where('area', '>=', $request->areaMin);
        }        
        if($request->areaMax){
            $property = $property->where('area', '<=', $request->areaMax);
        }
        // $property->allowedSorts('price', 'area');
        //return PropertyResource::collection($property);
        return $property->jsonPaginate(20);
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
        $property = new Property;
        //return $request;
        $property->category = $request->category['value'];
        $property->categoryGe = $request->category['label'];
        $property->contract = $request->contract['value'];
        $property->contractGe = $request->contract['label'];
        $property->price = $request->price;
        $property->currency = $request->currency['value'];
        $property->textGe = $request->textGe ? $request->textGe : null;
        $property->textEn = $request->textEn ? $request->textEn : null;
        $property->textRu = $request->textRu ? $request->textRu : null;
        $property->city = $request->city['value'];
        $property->cityGe = $request->city['label'];
        $property->district = $request->district ? $request->district['value']: null;
        $property->districtGe = $request->district ? $request->district['label']: null;
        $property->street = $request->street ? $request->street['value'] : null;
        $property->streetGe = $request->street ? $request->street['label'] : null;
        $property->address = $request->address ? $request->address : null;
        
        $property->area = $request->area;
        $property->yard = $request->yard ? $request->yard : null;
        $property->status = $request->status['value'];
        $property->statusGe = $request->status['label'];
        $property->quality = $request->condition ? $request->condition['value'] : null;
        $property->qualityGe = $request->condition ? $request->condition['label'] : null;
        $property->rooms = $request->rooms ? $request->rooms : null;
        $property->bedrooms = $request->bedrooms ? $request->bedrooms : null;
        $property->bathrooms = $request->bathrooms ?  $request->bathrooms : null;
        $property->floor = $request->floor ? $request->floor : null;
        $property->floors = $request->floors ? $request->floors : null;
        
        if($request->eBalcony){
            $property->balcony = $request->balcony ? $request->balcony : 0;
        }
        if($request->eVeranda){
        $property->veranda = $request->veranda ? $request->veranda : 0;
        }
        if($request->eLoggia){
        $property->loggia = $request->loggia ? $request->loggia : 0;
        }
        $property->ceiling = $request->ceiling ? $request->ceiling : null;

        $property->parking = $request->parking ? $request->parking['value'] : null;
        $property->parkingGe = $request->parking ? $request->parking['label'] : null;
        $property->heating = $request->heating ? $request->heating['value'] : null;
        $property->heatingGe = $request->heating ? $request->heating['label'] : null;
        $property->hotWater = $request->hotWater ? $request->hotWater['value'] : null;
        $property->hotWaterGe = $request->hotWater ? $request->hotWater['label'] : null;
        $property->storeroom = $request->storeroom ? $request->storeroom['value'] : null;
        $property->storeroomGe = $request->storeroom ? $request->storeroom['label'] : null;
        
        $property->conditioner = $request->conditioner ? 1 : 0;
        $property->telephone = $request->telephone ? 1 : 0;
        $property->furniture = $request->furniture ? 1 : 0;
        $property->elevator = $request->elevator ? 1 : 0;
        $property->internet = $request->internet ? 1 : 0;
        $property->electonics = $request->electonics ? 1 : 0;
        $property->television = $request->television ? 1 : 0;
        $property->fireplace = $request->fireplace ? 1 : 0;

        $property->lat = $request->lat ? $request->lat : null;
        $property->lng = $request->lng ? $request->lng : null;

        $property->agentID = $request->agentID;
        $property->agencyID = $request->agencyID;
        $property->cadastral = $request->cadastral ? $request->cadastral : null;
        $property->owner = $request->owner;
        $property->ownerNum = $request->ownerNum;
        $property->comment = $request->comment ? $request->comment : null;
        $property->active = $request->active;
        $property->priority = $request->priority;
        $property->verified = $request->verified;
        $property->save();

        return $property->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $property = Property::find($id);
        return $property;
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
            $property = Property::find($id);
            if($request->images && !($request->has('priority')) ){
                if($request->images != "" || $request->images != null ){
                    $property->images = json_encode($request->images);
                };
            }elseif (!($request->has('priority'))){

                if( $request->filled('active') ){
                    $property->active =  $request->active;
                };
                if( $request->filled('verified')){
                    $property->verified = $request->verified;
                };
            }
            else{
                if($request->images != "" || $request->images != null ){
                    $property->images = json_encode($request->images);
                }
                $property->category = $request->category['value'];
                $property->categoryGe = $request->category['label'];
                $property->contract = $request->contract['value'];
                $property->contractGe = $request->contract['label'];
                $property->price = $request->price;

                $property->currency = $request->currency['value'];
                $property->textGe = $request->textGe ? $request->textGe : null;
                $property->textEn = $request->textEn ? $request->textEn : null;
                $property->textRu = $request->textRu ? $request->textRu : null;
                $property->city = $request->city['value'];
                $property->cityGe = $request->city['label'];
                $property->district = $request->district ? $request->district['value']: null;
                $property->districtGe = $request->district ? $request->district['label']: null;
                $property->street = $request->street ? $request->street['value'] : null;
                $property->streetGe = $request->street ? $request->street['label'] : null;
                $property->address = $request->address ? $request->address : null;
                
                $property->area = $request->area;
                $property->yard = $request->yard ? $request->yard : null;
                $property->status = $request->status['value'];
                $property->statusGe = $request->status['label'];
                $property->quality = $request->condition ? $request->condition['value'] : null;
                $property->qualityGe = $request->condition ? $request->condition['label'] : null;
                $property->rooms = $request->rooms ? $request->rooms : null;
                $property->bedrooms = $request->bedrooms ? $request->bedrooms : null;
                $property->bathrooms = $request->bathrooms ?  $request->bathrooms : null;
                $property->floor = $request->floor ? $request->floor : null;
                $property->floors = $request->floors ? $request->floors : null;
                
                if($request->eBalcony){
                    $property->balcony = $request->balcony ? $request->balcony : 0;
                }
                if($request->eVeranda){
                $property->veranda = $request->veranda ? $request->veranda : 0;
                }
                if($request->eLoggia){
                $property->loggia = $request->loggia ? $request->loggia : 0;
                }
                $property->ceiling = $request->ceiling ? $request->ceiling : null;

                $property->parking = $request->parking ? $request->parking['value'] : null;
                $property->parkingGe = $request->parking ? $request->parking['label'] : null;
                $property->heating = $request->heating ? $request->heating['value'] : null;
                $property->heatingGe = $request->heating ? $request->heating['label'] : null;
                $property->hotWater = $request->hotWater ? $request->hotWater['value'] : null;
                $property->hotWaterGe = $request->hotWater ? $request->hotWater['label'] : null;
                $property->storeroom = $request->storeroom ? $request->storeroom['value'] : null;
                $property->storeroomGe = $request->storeroom ? $request->storeroom['label'] : null;
                
                $property->conditioner = $request->conditioner ? 1 : 0;
                $property->telephone = $request->telephone ? 1 : 0;
                $property->furniture = $request->furniture ? 1 : 0;
                $property->elevator = $request->elevator ? 1 : 0;
                $property->internet = $request->internet ? 1 : 0;
                $property->electonics = $request->electonics ? 1 : 0;
                $property->television = $request->television ? 1 : 0;
                $property->fireplace = $request->fireplace ? 1 : 0;

                $property->lat = $request->lat ? $request->lat : null;
                $property->lng = $request->lng ? $request->lng : null;

                $property->agentID = $request->agentID;
                $property->agencyID = $request->agencyID;
                $property->cadastral = $request->cadastral ? $request->cadastral : null;
                $property->owner = $request->owner;
                $property->ownerNum = $request->ownerNum;
                $property->comment = $request->comment ? $request->comment : null;
                $property->active = $request->active;
                $property->priority = $request->priority;
                $property->verified = $request->verified;
            }
            
            $property->save();

            return  $property->id;
        } catch (Exception $e) {
            return $e->getMessage();
        }
}


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $property = Property::find($id);
        $property->delete();
        return 'yey';
    }
}
