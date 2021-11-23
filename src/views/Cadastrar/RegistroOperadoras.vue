<template>
  <div class="relatorios">
    <PagesSubHeader icon="fal fa-sim-card" titulo="Operadoras">
      <div class="card">
        <div class="card-body" />
      </div>
    </PagesSubHeader>
    <div fluid class="container col-12" v-if="dataOK">
      <!-- CAMPOS DE EDIÇÃO/CRIAÇÃO DE OPERADORA -->
        <div class="form-group">

          <!-- LINHA 1 -->
          <div class="d-inline">
            <div class="row mb-2 justify-content-center">
              <div class="col-6">
                <div class="profile-content user-name-line d-flex">
                  <i class="fal fa-ad fa-2x" style="margin-left: 5px" />
                  <b-form-input
                    id="profile-name-input"
                    type="text"
                    placeholder="Nome"
                    v-model="operadora.name"
                  />
                </div>
              </div>
              <div class="col-6">
                <div class="d-inline">
                  <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-key fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      id="profile-name-input"
                      type="password"
                      placeholder="Senha"
                      v-model="operadora.secret"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- LINHA 1: FIM -->

          <!-- LINHA 2 -->
          <div class="d-inline">
            <div class="row mb-2 justify-content-center">
              <div class="col-4">
                <div class="d-inline">
                  <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-at fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      id="profile-name-input"
                      type="text"
                      placeholder="IP"
                      v-model="operadora.host"
                    />
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="profile-content user-name-line d-flex">
                  <i
                    class="fal fa-door-closed fa-2x"
                    style="margin-left: 5px"
                  />
                  <b-form-input
                    id="profile-name-input"
                    type="number"
                    placeholder="Porta"
                    v-model="operadora.port"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="profile-content user-name-line d-flex">
                  <i class="fal fa-exchange fa-2x" style="margin-left: 5px" />
                  <b-form-input
                    id="profile-name-input"
                    type="text"
                    placeholder="Contexto"
                    v-model="operadora.context"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- LINHA 2: FIM -->

          <!-- LINHA 3 -->
          <div class="d-inline">
            <div class="row mb-2 justify-content-center">
              <div class="col-4">
                <div class="d-inline">
                  <div class="profile-content user-name-line d-flex">
                    <i
                      class="fal fa-file-audio fa-2x"
                      style="margin-left: 5px"
                    />
                    <b-form-input
                      id="profile-name-input"
                      type="text"
                      placeholder="Codec"
                      v-model="operadora.allow"
                    />
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="profile-content user-name-line d-flex">
                  <i class="fal fa-ad fa-2x" style="margin-left: 5px" />
                  <b-form-input
                    id="profile-name-input"
                    type="text"
                    placeholder="From user"
                    v-model="operadora.fromuser"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="profile-content user-name-line d-flex">
                  <i
                    class="fal fa-sort-numeric-up fa-2x"
                    style="margin-left: 5px"
                  />
                  <b-form-input
                    id="profile-name-input"
                    type="text"
                    placeholder="Call limit"
                    v-model="operadora.call_limit"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- LINHA 3: FIM -->

          <!-- LINHA 4 -->
          <div class="d-inline">
            <div class="row mb-2 justify-content-center">
              <div class="col-8">
                <div class="profile-content user-name-line d-flex">
                  <i class="fal fa-ad fa-2x" style="margin-left: 5px" />
                  <b-form-input
                    id="profile-name-input"
                    type="text"
                    placeholder="Username"
                    v-model="operadora.username"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="d-inline">
                  <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-ad fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      id="profile-name-input"
                      type="text"
                      placeholder="Default user"
                      v-model="operadora.defaultuser"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- LINHA 4: FIM -->

          <!-- LINHA 5 -->
          <div class="d-inline">
            <div class="row mb-2 justify-content-center">
              <div class="col-12">
                <div class="profile-content user-name-line d-flex">
                  <i class="fal fa-ad fa-2x" style="margin-left: 5px" />
                  <b-form-textarea
                    id="profile-name-input"
                    placeholder="Formato discagem"
                    rows="2"
                    max-rows="15"
                    v-model="operadora.dial_format"
                  >
                  </b-form-textarea>
                </div>
              </div>
            </div>
          </div>
          <!-- LINHA 5: FIM -->

          <!-- LINHA 6 -->
          <div class="d-inline">
            <div class="row mb-3 justify-content-center">
              <div class="col-3">
                <div class="d-inline">
                  <div class="profile-content user-name-line d-flex">
                <i class="fal fa-id-card fa-2x" style="margin-left: 5px" />
                  <div id="multiselect-input">
                  <multiselect
                    v-model="tipos_finish"
                    :placeholder="'Tipos de Finalização'"
                    :label="'name'"
                    :track-by="'code'"
                    :options="finish_tipos"
                    :multiple="false"
                    :selectLabel="MSprops.selectLabel" :selectGroupLabel="MSprops.selectGroupLabel" :selectedLabel="MSprops.selectedLabel" :deselectLabel="MSprops.deselectLabel" :deselectGroupLabel="MSprops.deselectGroupLabel"
                  />
                </div>
                  </div>
                </div>
              </div>
              <div class="col-3">
                <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-code fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      id="profile-name-input"
                      type="text"
                      placeholder="Accountcode"
                      v-model="operadora.accountcode"
                    />
                  </div>
              </div>
              <div class="col-3">
                <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-code fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      id="profile-name-input"
                      type="number"
                      placeholder="Channel"
                      v-model="operadora.accountchannel"
                    />
                  </div>
              </div>
              <div class="col-3">
                <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-ad fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      id="profile-name-input"
                      type="text"
                      placeholder="DTMF"
                      v-model="operadora.dtmfmode"
                    />
                  </div>
              </div>
            </div>
          </div>
          <!-- LINHA 6: FIM -->

          <!-- LINHA 7 -->
          <div class="d-inline">
            <div class="row mb-3 justify-content-center">
              <div class="col-4">
                <div class="d-inline">
                  <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-code fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      id="profile-name-input"
                      type="number"
                      placeholder="Lastms"
                      v-model="operadora.lastms"
                    />
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-code fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      id="profile-name-input"
                      type="text"
                      placeholder="NAT"
                      v-model="operadora.nat"
                    />
                  </div>
              </div>
              <div class="col-4">
                <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-id-card fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      id="profile-name-input"
                      type="number"
                      placeholder="Perfil"
                      v-model="operadora.perfil"
                    />
                  </div>
              </div>
            </div>
          </div>
          <!-- LINHA 7: FIM -->

          <!-- LINHA 8 -->
          <div class="d-inline">
            <div class="row mb-3">
              <div class="col-3">
                <div class="profile-content user-name-line d-flex">
                <i class="fal fa-code fa-2x" style="margin-left: 5px" />
                  <div id="multiselect-input">
                  <multiselect
                    v-model="operadora.priority"
                    :placeholder="'Prioridade'"
                    :label="'name'"
                    :track-by="'code'"
                    :options="finish_prioridades"
                    :multiple="false"
                    :selectLabel="MSprops.selectLabel" :selectGroupLabel="MSprops.selectGroupLabel" :selectedLabel="MSprops.selectedLabel" :deselectLabel="MSprops.deselectLabel" :deselectGroupLabel="MSprops.deselectGroupLabel"
                  />
                </div>
                  </div>
              </div>
              <div class="col-3">
                <div class="profile-content user-name-line d-flex">
                <i class="fal fa-code fa-2x" style="margin-left: 5px" />
                  <div id="multiselect-input">
                  <multiselect
                    v-model="operadora.qualify"
                    :placeholder="'Qualificar'"
                    :label="'name'"
                    :track-by="'code'"
                    :options="finish_qualificacoes"
                    :multiple="false"
                    :selectLabel="MSprops.selectLabel" :selectGroupLabel="MSprops.selectGroupLabel" :selectedLabel="MSprops.selectedLabel" :deselectLabel="MSprops.deselectLabel" :deselectGroupLabel="MSprops.deselectGroupLabel"
                  />
                </div>
                  </div>
              </div>
              <div class="col-3">
                <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-code fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      id="profile-name-input"
                      type="number"
                      placeholder="Reg Seconds"
                      v-model="operadora.regseconds"
                    />
                  </div>
              </div>
              <div class="col-3">
                <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-code fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      id="profile-name-input"
                      type="text"
                      placeholder="Reg Server"
                      v-model="operadora.regserver"
                    />
                  </div>
              </div>
            </div>
          </div>
          <!-- LINHA 8: FIM -->

          <!-- LINHA 9 -->
          <div class="d-inline">
            <div class="row mb-3 justify-content-center">
              <div class="col-8">
                <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-code fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      id="profile-name-input"
                      type="text"
                      placeholder="Tec Prefix"
                      v-model="operadora.tec_prefix"
                    />
                  </div>
              </div>
              <div class="col-4">
                <div class="d-inline">
                  <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-code fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      id="profile-name-input"
                      type="text"
                      placeholder="Tec Prefix Local"
                      v-model="operadora.tec_prefix_local"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- LINHA 9: FIM -->


          <!-- LINHA 10 -->
          <div class="d-inline">
            <div class="row mb-3 justify-content-center">
              <div class="col-8">
                <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-code fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      id="profile-name-input"
                      type="text"
                      placeholder="Transport"
                      v-model="operadora.transport"
                    />
                  </div>
              </div>
              <div class="col-4">
                <div class="d-inline">
                  <div class="profile-content user-name-line d-flex">
                    <i class="fal fa-ad fa-2x" style="margin-left: 5px" />
                    <b-form-input
                      id="profile-name-input"
                      type="text"
                      placeholder="Usuário Agente"
                      v-model="operadora.useragent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- LINHA 10: FIM -->

          <!-- LINHA 11 -->
          <div class="row mb-3 justify-content-left">
            <div class="col-12">
              <div class="custom-control custom-checkbox custom-control-inline">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="local"
                  v-model="operadora.flag_local"
                />
                <label class="custom-control-label pt-1 pr-1" for="local"
                  >Local</label
                >
              </div>
              <div class="custom-control custom-checkbox custom-control-inline">
                <input type="checkbox" class="custom-control-input" id="ldn" v-model="operadora.flag_ldn"/>
                <label class="custom-control-label pt-1 pr-1" for="ldn"
                  >LDN</label
                >
              </div>
              <div class="custom-control custom-checkbox custom-control-inline">
                <input type="checkbox" class="custom-control-input" id="vc1" v-model="operadora.flag_vc1"/>
                <label class="custom-control-label pt-1 pr-1" for="vc1"
                  >VC1</label
                >
              </div>
              <div class="custom-control custom-checkbox custom-control-inline">
                <input type="checkbox" class="custom-control-input" id="vc2" v-model="operadora.flag_vc2"/>
                <label class="custom-control-label pt-1 pr-1" for="vc2"
                  >VC2</label
                >
              </div>
              <div class="custom-control custom-checkbox custom-control-inline">
                <input type="checkbox" class="custom-control-input" id="VC3" v-model="operadora.flag_vc3"/>
                <label class="custom-control-label pt-1 pr-1" for="VC3"
                  >VC3</label
                >
              </div>
              <div class="custom-control custom-checkbox custom-control-inline">
                <input type="checkbox" class="custom-control-input" id="LDI" v-model="operadora.flag_ldi"/>
                <label class="custom-control-label pt-1 pr-1" for="LDI"
                  >LDI</label
                >
              </div>
            </div>
          </div>
          <!-- LINHA 11: FIM -->

          <!-- <b-row>
            <b-col class="mr-auto p-3" cols="auto">
              <button class="btn btn-dark botao-salvar" type="submit">
                Salvar
              </button> 
            </b-col>
            <b-col class="p-3" cols="auto">
              <div class="custom-control custom-switch">
                <input
                  id="customSwitch1"
                  checked
                  class="custom-control-input bg-dark"
                  type="checkbox"
                />
                <label id="kkk" class="custom-control-label" for="customSwitch1"
                  >Status</label
                >
              </div>
            </b-col>
          </b-row> -->
          
        </div>
      <!-- CAMPOS DE EDIÇÃO/CRIAÇÃO DE OPERADORA: FIM -->
    </div>
    <b-container fluid class="salvar-container">
      <b-button class="botao-salvar" @click="saveOperadora(oID)">SALVAR</b-button>
      <!-- <div class="custom-control custom-switch" v-if="dataOK">
        <input
          id="customSwitch1"
          
          class="custom-control-input bg-dark"
          type="checkbox"
          v-model="operadora.status"
        />
        <label id="kkk" class="custom-control-label" for="customSwitch1">Status</label>
      </div> -->
      <b-form-checkbox switch :checked="true" v-model="operadora.status" v-if="dataOK" id="status-button"><span>Status</span></b-form-checkbox>
    </b-container>
  </div>
</template>

<script>
import PagesSubHeader from "../../components/subheader/PagesSubHeader.vue";
import Multiselect from "vue-multiselect";
import ValidateToaster from '../../plugins/validateToaster.js'; //importando "mixin" (no caso está na pasta plugin)
import axios from 'axios';
import {baseApiUrl, defaultOperator, vueMultiselectProps} from '../../config/global';


export default {
  name:"RegistroOperadoras",
  mixins: [ValidateToaster],
  components: {
    PagesSubHeader,
    Multiselect
  },
  props:{
    opID:{
      type:Number, 
      default:-1
    }
  },
  methods: {
    /* // carregar() {
    //   this.service.register(this.usuario).then(
    //     () => {
    //       if (this.id) this.$router.push({ name: "Home" });
    //       this.usuario = new Usuario();
    //     },
    //     (err) => console.log(err)
    //   );
    // }, */
    showOpID(){
      console.log("opID:\n",this.opID);
    },
    setOperadora(){
      if (this.opID > 0) this.getOperatorData(this.oID);
      else this.setDefaultOperator();
    },
    getOperatorData(id){
      axios.get(baseApiUrl+'/operators/'+id)
      .then(res => {
        console.log("\n\tStatus:\t",res.status);
        let p = res.data.data;
        let operadora = {};

            operadora.id = p[0].id;
            operadora.name = p[0].name;
            operadora.secret = p[0].secret;
            operadora.host = p[0].host;
            operadora.port = p[0].port;
            operadora.context = p[0].context;
            operadora.allow = p[0].allow;
            operadora.fromuser = p[0].fromuser;
            operadora.call_limit = p[0]['call-limit'];
            operadora.username = p[0].username;
            operadora.defaultuser = p[0].defaultuser;
            operadora.dial_format = p[0].dial_format;
            operadora.perfil = p[0].perfil;
            operadora.accountcode = p[0].accountcode;
            operadora.channel = p[0].channel;
            operadora.dtmfmode = p[0].dtmfmode;
            operadora.lastms = p[0].lastms;
            operadora.nat = p[0].nat;
            operadora.priority = p[0].priority;
            operadora.qualify = p[0].qualify;
            operadora.regseconds = p[0].regseconds;
            operadora.regserver = p[0].regserver;
            operadora.tec_prefix = p[0].tec_prefix;
            operadora.tec_prefix_local = p[0].tec_prefix_local;
            operadora.transport = p[0].transport;
            operadora.useragent = p[0].useragent;
            operadora.flag_local = p[0].flag_local?true:false;
            operadora.flag_ldn = p[0].flag_ldn?true:false;
            operadora.flag_vc1 = p[0].flag_vc1?true:false;
            operadora.flag_vc2 = p[0].flag_vc2?true:false;
            operadora.flag_vc3 = p[0].flag_vc3?true:false;
            operadora.flag_ldi = p[0].flag_ldi?true:false;
            operadora.status = p[0].status?true:false;

        console.log("Operadora:\n",operadora);
        this.operadora = {...operadora};
        this.dataOK = true;
      })
      .catch(error => {
        console.log("\n\tERROR RESPONSE:\n",error.response);
        this.setDefaultOperator();
      })
    },
    setDefaultOperator(){
      this.operadora = {...defaultOperator};
      this.dataOK = true;
    },
    saveOperadora(id_in) {
      let checkID = id_in>0?true:false;
      if (checkID) {
        let id = id_in.toString();
        this.updateOperator(id);
      }
      else this.addNewOperator();
    },
    updateOperator(id) {
      // console.log(id)
      let body = {};
      body.id = this.operadora.id;
      body.name = this.operadora.name;
      body.secret = this.operadora.secret;
      body.host = this.operadora.host;
      body.port = this.operadora.port;
      body.context = this.operadora.context;
      body.allow = this.operadora.allow;
      body.fromuser = this.operadora.fromuser;
      body['call-limit'] = this.operadora.call_limit;
      body.username = this.operadora.username;
      body.defaultuser = this.operadora.defaultuser;
      body.dial_format = this.operadora.dial_format;
      body.perfil = this.operadora.perfil;
      body.accountcode = this.operadora.accountcode;
      body.channel = this.operadora.channel;
      body.dtmfmode = this.operadora.dtmfmode;
      body.lastms = this.operadora.lastms;
      body.nat = this.operadora.nat;
      body.priority = this.operadora.priority;
      body.qualify = this.operadora.qualify;
      body.regseconds = this.operadora.regseconds;
      body.regserver = this.operadora.regserver;
      body.tec_prefix = this.operadora.tec_prefix;
      body.tec_prefix_local = this.operadora.tec_prefix_local;
      body.transport = this.operadora.transport;
      body.useragent = this.operadora.useragent;
      body.flag_local = this.operadora.flag_local?1:0;
      body.flag_ldn = this.operadora.flag_ldn?1:0;
      body.flag_vc1 = this.operadora.flag_vc1?1:0;
      body.flag_vc2 = this.operadora.flag_vc2?1:0;
      body.flag_vc3 = this.operadora.flag_vc3?1:0;
      body.flag_ldi = this.operadora.flag_ldi?1:0;
      body.status = this.operadora.status?1:0;
      console.log("Body @updateOperator():\n",body);
      this.putEditedOperator(body,id);
    },
    putEditedOperator(body, id){
      axios.put(baseApiUrl+'/operators/'+id, body)
      .then(res => {
        console.log("\n\tStatus:\t",res.status);
        let toast = {
                      isValidated:true,
                      title:'OPERADORA EDITADA',
                      message:'Operadora '+ body.name.toUpperCase()+' editada com sucesso!',
                    }
        this.validateAndToast(toast);
      })
      .catch(error => {
        console.log("\n\tERROR RESPONSE:\n",error.response)
        let toast = {
            isValidated:false,
            title:'OPERADORA NÃO EDITADA',
            message:'A Operadora '+ body.name.toUpperCase()+' não pôde ser editada. Motivo: '+error.message,
        }
        this.validateAndToast(toast);
      })
    },
    addNewOperator() {
      let body = {};
      body.id = this.operadora.id;
      body.name = this.operadora.name;
      body.secret = this.operadora.secret;
      body.host = this.operadora.host;
      body.port = this.operadora.port;
      body.context = this.operadora.context;
      body.allow = this.operadora.allow;
      body.fromuser = this.operadora.fromuser;
      body['call-limit'] = this.operadora.call_limit;
      body.username = this.operadora.username;
      body.defaultuser = this.operadora.defaultuser;
      body.dial_format = this.operadora.dial_format;
      body.perfil = this.operadora.perfil;
      body.accountcode = this.operadora.accountcode;
      body.channel = this.operadora.channel;
      body.dtmfmode = this.operadora.dtmfmode;
      body.lastms = this.operadora.lastms;
      body.nat = this.operadora.nat;
      body.priority = this.operadora.priority;
      body.qualify = this.operadora.qualify;
      body.regseconds = this.operadora.regseconds;
      body.regserver = this.operadora.regserver;
      body.tec_prefix = this.operadora.tec_prefix;
      body.tec_prefix_local = this.operadora.tec_prefix_local;
      body.transport = this.operadora.transport;
      body.useragent = this.operadora.useragent;
      body.flag_local = this.operadora.flag_local?1:0;
      body.flag_ldn = this.operadora.flag_ldn?1:0;
      body.flag_vc1 = this.operadora.flag_vc1?1:0;
      body.flag_vc2 = this.operadora.flag_vc2?1:0;
      body.flag_vc3 = this.operadora.flag_vc3?1:0;
      body.flag_ldi = this.operadora.flag_ldi?1:0;
      body.status = this.operadora.status?1:0;
      console.log("Body @addNewOperator():\n",body);
      this.postNewOperator(body);
    },
    postNewOperator(body){
      axios.post(baseApiUrl+'/operators', body)
      .then(res => {
        console.log("\n\tStatus:\t",res.status);
        let toast = {
            isValidated:true,
            title:'NOVA OPERADORA ADICIONADA',
            message:'Nova Operadora '+ body.name.toUpperCase()+' adicionada com sucesso!',
          }
        this.validateAndToast(toast);
      })
      .catch(error => {
        console.log("\n\tERROR RESPONSE:\n",error.response)
        let toast = {
            isValidated:false,
            title:'NOVA OPERADORA NÃO ADICIONADA',
            message:'Nova Operadora '+ body.name.toUpperCase()+' não pôde ser adicionada. Motivo: '+error.message,
          }
        this.validateAndToast(toast);
      })
    }
  },
  created() {
    this.showOpID();
    this.setOperadora();
  },
  mounted() {
    // this.showOpID();
    $(document).on("click", "#close-preview", function () {
      $(".image-preview").popover("hide");
    });

    $(function () {
      // Clear event
      $(".image-preview-clear").click(function () {
        $(".image-preview").attr("data-content", "").popover("hide");
        $(".image-preview-filename").val("");
        $(".image-preview-clear").hide();
        $(".image-preview-input input:file").val("");
        $(".image-preview-input-title").text(" ");
      });
      // Create the preview image
      $(".image-preview-input input:file").change(function () {
        var img = $("<img/>", {
          id: "dynamic",
          width: 50,
          height: 100,
        });
        var file = this.files[0];
        var reader = new FileReader();
        // Set preview image into the popover data-content
        reader.onload = function (e) {
          $(".image-preview-input-title").text("Trocar");
          $(".image-preview-clear").show();
          $(".image-preview-filename").val(file.name);
          img.attr("src", e.target.result);
        };
        reader.readAsDataURL(file);
      });
    });
  },
  data() {
    return {
      operadora:null,
      dataOK:false,
      oID:this.opID.toString(),
      MSprops:vueMultiselectProps,
      prioridades_finish: [],
      qualificacoes_finish: [],
      tipos_finish: [],
      finish_tipos: [
        { name: "Ativa", code: "A" },
        { name: "Manual", code: "M" },
        { name: "Recebe", code: "R" },
      ],
       finish_prioridades: [
        { name: "0", code: 0 },
        { name: "1", code: 1 },
        { name: "2", code: 2 },
      ],
       finish_qualificacoes: [
        { name: "Sim", code: "yes" },
        { name: "Não", code: "no" }
      ],
      // msg: "",
      //   usuario: new Usuario(),
      //   id: this.$route.params.id,
    }
  }
};
</script>



<style scoped>
#input-pic {
  border-left: 1px solid rgb(0, 0, 0) !important;
}

.btn-default {
  background-image: linear-gradient(to top, #ffffff, #ffffff);
}
.image-preview-input {
  position: relative;
  overflow: hidden;
  margin: 0px;
  color: #333;
  background-color: #fff;
  border-color: #ccc;
}
.image-preview-input input[type="file"] {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  padding: 0;
  font-size: 20px;
  cursor: pointer;
  opacity: 0;
  filter: alpha(opacity=0);
}
.image-preview-input-title {
  margin-left: 2px;
}
.form-control:disabled,
.form-control[readonly] {
  background-color: #ffffff;
  opacity: 1;
}

label#kkk {
  padding-top: 2.7px;
}

.form-icon,
.form-icon:hover {
  width: 42px;
}

.centralize {
  margin-left: 450px;
}

.botao-salvar {
  background-color: #0d6d9dad;
}

.botao-salvar:hover {
  background-color: #0d6d9d;
}

.salvar-container{
    bottom: 0;
    display: flex;
    justify-content: space-between;
}
.user-name-line {
  align-items: center !important;
  border-style: solid;
  border-width: 1px;
  border-color: #d0cece;
  padding-left: 0%;
  padding-right: 0%;
}
.user-name-line2 {
  align-items: center !important;
  border-style: solid;
  border-width: 1px;
  height: 42px;
  border-color: #d0cece;
  padding-left: 0%;
  padding-right: 0%;
}
#profile-name-input {
  margin-left: 5px;
  margin-right: 0px;
  border-left-color: black;
  border-radius: 0px;
}
#profile-name-input2 {
  margin-left: 5px;
  margin-right: 0px;
  border-left-color: black;
  border-radius: 0px;
  border-right-width: 0px;
  border-top-width: 0px;
  border-bottom-width: 0px;
}
#multiselect-input {
  display: flex;
  width: 100%;
  margin-left: 6px;
}

i.fal.fa-2x {
  width: 26px;
  height: 26px;
}

.bottom {
  margin-top: 20px;
}

.panel-content {
  overflow: auto;
}

.panel .panel-container .panel-content {
  padding: 0;
}

.card-body {
  padding: 5px;
  height: 50px;
  width: 0;
  border: 0;
  color: #ffffff;
}

.card {
  box-shadow: none;
  border: none;
}
</style>