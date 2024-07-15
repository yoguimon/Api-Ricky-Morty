<!--vueInit para generar-->
<template>
    <h1 class="text-center">Api Richy Morty</h1>
    <div class="principal">
        <div class="row justify-content-center">
            <div class="col-10 col-md-7 mt-5">
                <input type="search" v-model="search" @keyup="buscar()" class="form-control" placeholder="buscar...">
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div v-for="item in datos" :key="item.id" class="col-12 col-md-6">
                    <div class="mt-5  mb-3 card mb-3 rounded-5 cursor" style="background-color: #353535;" data-bs-toggle="modal" data-bs-target="#modalDetalle" @click="verDetalle(item.id)">
                        <div class="row">
                            <div class="col-12 col-md-5">
                                <img :src="item.image" class="rounded-5" width="100%" height="100%" :alt="item.name">
                            </div>
                            <div class="col-12 col-md-7">
                                <div class="card-body text-white">
                                    <p class="card-title">{{item.name}}</p>
                                    <p class="card-text">{{item.status=="Alive"?"🟢":item.status=="Dead"?"🔴":"🔵"}} {{item.status}} - {{item.species}}</p>
                                    <span class="texto">Last khown location:</span>
                                    <p>{{item.location.name}}</p>
                                    <span class="texto">Origin:</span>
                                    <p>{{item.origin.name}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 text-center mb-3">
                    <button type="button" class="btn btn-primary btn-lg" @click="cargando()">Cargar mas</button>
                </div>  
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="modalDetalle" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content" style="background-color: #353535;">
                    <div class="modal-body">
                        <div class="text-end">
                            <button type="button" class="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="row">
                            <div class="col-12 text-center">
                                <img :src="personaje.image" alt="" class="rounded-circle border border-3" :class="{'border-success':personaje.status=='Alive','border-danger':personaje.status=='Dead','border-primary':personaje.status=='unknown'}" width="150px" height="150px"><br>
                                <p class="badge" :class="{'bg-success':personaje.status=='Alive','bg-danger':personaje.status=='Dead','bg-primary':personaje.status=='unknown'}">{{personaje.status}}</p>
                            </div>
                            <div class="col-12" style="background-color: #353535;">
                                <ul class="list-group">
                                    <li class="list-group-item" style="border: none;font-size: 20px;"><span><b>Especie : </b>{{personaje.species}}</span></li>
                                    <li class="list-group-item" style="border: none;font-size: 20px;"><span><b>Genero : </b>{{personaje.gender}}</span></li>
                                    <li class="list-group-item" style="border: none;font-size: 20px;"><span><b>Tipo : </b>{{personaje.type}}</span></li>
                                    <li class="list-group-item" style="border: none;font-size: 20px;"><span><b>Origen : </b>{{personaje.origin?.name}}</span></li>
                                    <li class="list-group-item" style="border: none;font-size: 20px;"><span><b>Locación : </b>{{personaje.location?.name}}</span></li>
                                </ul>
                            </div>
                            <div class="text-end mt-2">
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
    const urlBase = "https://rickandmortyapi.com/api/character";
    const datos = ref([]);
    const paginacion = ref({
        total: null,
        pagina: 1
    });
    const search = ref("");
    const personaje = ref({});
    onMounted(() => {
        window.addEventListener("scroll",cargando);
        listar();
    });
    const listar = async () => {
      try{
        const {data} = await axios.get(urlBase+"?page="+paginacion.value.pagina+"&name="+search.value);
        datos.value.push(...data.results);
        paginacion.value.total = data.info.pages;
      }catch(error){
        console.log(error);
      }
    }
    function cargando(){
        if(paginacion.value.pagina<=paginacion.value.total){
            if(window.innerHeight + window.scrollY > document.documentElement.scrollHeight){
            paginacion.value.pagina++;
            listar();
        }
        }
        
        
    }
    function buscar(){
        datos.value = [];
        paginacion.value.pagina=1;
        listar();
    }
    async function verDetalle(id){
        const {data} = await axios.get(urlBase+"/"+id);
        personaje.value = data;
    }
</script>
<style>
    .principal{
        background-color: black;
    }
    .card-title{
        font-size: 25px;
    }
    .card-text{
        font-size: 20px;
    }
    .texto{
        
    }
    .cursor{
        cursor: pointer;
    }
</style>