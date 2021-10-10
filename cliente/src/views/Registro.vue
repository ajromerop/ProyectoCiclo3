<template>
    <div class="container">
        <h1>Registros</h1>

        <!-- ALERTA -->

    <!-- <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="warning"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <p>This alert will dismiss after {{ dismissCountDown }} seconds...</p>
      <b-progress
        variant="warning"
        :max="dismissSecs"
        :value="dismissCountDown"
        height="4px"
      ></b-progress>
    </b-alert> -->

        <b-alert 
        :show="dismissCountDown" 
        dismissible 
        :variant="mensaje.color" 
        @dismissed="dismissCountDown=0" 
        @dismiss-count-down="countDownChanged" > 
        {{mensaje.texto}} 
        </b-alert>

    <!-- acá termina la alerta -->

        <form @submit.prevent="agregarRegistro()" v-if="!editar">
            <h3>Agregar un nuevo registro</h3>

            <input type="text" class="form-control my-2" placeholder="Ingrese nombre paciente" v-model="registro.nombre_paciente">
            <input type="text" class="form-control my-2" placeholder="Ingrese id de paciente" v-model="registro.id_paciente">
            <input type="text" class="form-control my-2" placeholder="Ingrese nombre médico" v-model="registro.nombre_medico">
            <input type="text" class="form-control my-2" placeholder="Ingrese id de médico" v-model="registro.id_medico">
            <b-datepicker type="datetime" class="form-control my-2" v-model="registro.fecha_consulta" lang="es" format="YYYY-MM-DD HH:mm a" placeholder="Ingrese fecha" confirm></b-datepicker>
            <!-- <input type="time" class="form-control my-2" v-model="time" lang="es" format="HH-mm a" :time-picker-options="timePickerOptions" placeholder="Hora de consulta"> -->
            <b-button class="btn-success my-2" type="submit">Agregar</b-button>
            

        </form>

        <form @submit.prevent="editarRegistro(registroEditar)" v-if="editar">
            <h3>Editar Registro</h3>

            <input type="text" class="form-control my-2" placeholder="Ingrese nombre paciente" v-model="registroEditar.nombre_paciente">
            <input type="text" class="form-control my-2" placeholder="Ingrese id de paciente" v-model="registroEditar.id_paciente">
            <input type="text" class="form-control my-2" placeholder="Ingrese nombre médico" v-model="registroEditar.nombre_medico">
            <input type="text" class="form-control my-2" placeholder="Ingrese id de médico" v-model="registroEditar.id_medico">
            <b-datepicker type="datetime" class="form-control my-2" v-model="registroEditar.fecha_consulta" lang="es" format="YYYY-MM-DD HH:mm a" placeholder="Ingrese fecha" confirm></b-datepicker>
            <b-button class="btn-success my-2" type="submit">Editar</b-button>
            <b-button class="my-2 mx-2" type="submit" @click="editar=false">Cancelar</b-button>
            

        </form>


        <table class="table">
  <thead>
    <tr>
      <th scope="col">ID CONSULTA</th>
      <th scope="col">NOMBRE PACIENTE</th>
      <th scope="col">ID PACIENTE</th>
      <th scope="col">NOMBRE MEDICO</th>
      <th scope="col">ID MEDICO</th>
      <th scope="col">FECHA CONSULTA</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item,index) in registros" :key="index">
    <th scope="row">{{item._id}}</th>
      <td>{{item.nombre_paciente}}</td>
      <td>{{item.id_paciente}}</td>
      <td>{{item.nombre_medico}}</td>
      <td>{{item.id_medico}}</td>
      <td>{{item.fecha_consulta}}</td>
      <td>
        <button class="btn-danger mx-2 my-2" @click="eliminarRegistro(item._id)">Eliminar</button>
        <button class="btn-warning mx-2" @click="activarEdicion(item._id)">Editar</button>
      </td>
    </tr>

  </tbody>
</table>


    </div>
</template>

<script>
const DatePicker= require('vue2-datepicker');
//import DatePicker from 'vue2-datepicker';
//import 'vue2-datepicker/index.css';
export default {
  name:'App',
  components:{
    DatePicker
  },
    data(){
        return{
          // date:'',
          time:'',
          timePickerOption:{
            start: '00:00',
            step: '00:30',
            end: '20:00',
          },
          datetime: '',
          //range: '',

            registros:[],

            //SCRIPT DE LA ALERTA
            mensaje: {color: 'success', texto: ''},
            dismissSecs: 5,
            dismissCountDown: 0,
            //showDismissibleAlert: false,

            registro:{nombre_paciente:"", id_paciente:"", nombre_medico:"", id_medico:"", fecha_consulta:""},//, fecha_consulta:"" 
            editar:false,
            registroEditar:{}

        }
    },

    created(){


        this.listarRegistros();


    },

    methods: {
        listarRegistros(){

            this.axios.get('/buscartodo')
            .then(res=>{

                this.registros=res.data;



            })
            .catch(e=>{

                console.log(e.response)

            })
        },

        //METODO AGREGAR REGISTRO

        agregarRegistro(){
            this.axios.post('/registro-nuevo', this.registro)
            .then(res=>{

                this.registros.push(res.data)
                this.registro.nombre_paciente="";
                this.registro.id_paciente="";
                this.registro.nombre_medico="";
                this.registro.id_medico="";
                this.registro.fecha_consulta="";
                this.mensaje.color="success";
                this.mensaje.texto="Registro Agregada";
                this.showAlert();


            })
            .catch(e=>{

                console.log(e.response)

            })
            

        },

        //METODO ELIMINAR REGISTRO

        eliminarRegistro(id){
          
          this.axios.delete(`/eliminar-parametro/${id}`)
          .then(res=>{

            const index = this.registros.findIndex(item=> item._id===res.data._id);
            this.registros.splice(index, 1);
            this.mensaje.color="success";
            this.mensaje.texto="Registro eliminada";
            this.showAlert();
            
            })
          .catch(e=>{
            
            console.log(e.response);
           
          })

        },

        //METODO ACTIVAR EDICIÓN DE REGISTRO

        activarEdicion(id){
          
          this.editar=true;
          this.axios.get(`/buscar-parametro/${id}`)
          .then(res=>{
            
            this.registroEditar=res.data;

            })
          .catch(e=>{
            
            console.log(e.response);


          })
        },

        //ESTE METODO EDITA PROPIAMENTE EL REGISTRO
        editarRegistro(item){

          this.axios.put(`/actualizar/${item._id}`, item)
          .then(res=>{

             
            const index = this.registros.findIndex(n=> n._id===res.data._id);
            this.registros[index].nombre_paciente=res.data.nombre_paciente;
            this.registros[index].id_paciente=res.data.id_paciente;
            this.registros[index].nombre_medico=res.data.nombre_medico;
            this.registros[index].id_medico=res.data.id_medico;
            this.registros[index].fecha_consulta=res.data.fecha_consulta;
            this.mensaje.color="success";
            this.mensaje.texto="Registro editada";
            this.showAlert();
            this.editar=false;

          })
          .catch(e=>{

            console.log(e.response);



          })

        },



        //METODOS DE LA ALERTA

        countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      }


    }

}
</script>