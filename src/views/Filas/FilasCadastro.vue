<template>
    <div class="relatorios">        
        <pages-sub-header icon="fal fa-road" titulo="Cadastro de Filas">
            <div class="card spacer">
                <div class="card-body spacer"/>
            </div>
        </pages-sub-header>
    <!-- Seção Superior da Página -->
        <b-container fluid v-if="dataOK">
            <b-col cols='12'>
                <!-- Linha 1 {{ Nome[6] } , { Numero da Fila[3] } , { Tipo (Humano x Robô)[3] }} -->
                    <b-row class="filas-top-section-row">
                        <b-col cols='6'>
                            <div class="profile-content user-name-line d-flex">
                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                <b-form-input id="profile-name-input"  type="text" placeholder="Nome" v-model="name_queue" @change="setSlug"/>
                            </div>
                        </b-col>

                        <b-col cols='3'>
                            <div class="profile-content user-name-line d-flex">
                                <i class="fal fa-at fa-2x" style="margin-left: 5px;" />
                                <b-form-input id="profile-name-input"  type="number" placeholder="Número da Fila" v-model="queue_number" @change="setQNumber"/>
                            </div>
                        </b-col>
                        <b-col cols='3'>
                            <div class="profile-content user-name-line d-flex">
                                <i class="fal fa-at fa-2x" style="margin-left: 5px;" />
                                <!-- <b-form-input id="profile-name-input"  type="text" placeholder="Tipo (Humano x Robô)"/> -->
                                <div id="multiselect-input">
                                    <multiselect v-model="tipo_humano" :placeholder="'Tipo (Humano x Robô)'" :label="'name'" :track-by="'code'" :options="humano_tipos" :multiple="false" :selectLabel="MSprops.selectLabel" :selectGroupLabel="MSprops.selectGroupLabel" :selectedLabel="MSprops.selectedLabel" :deselectLabel="MSprops.deselectLabel" :deselectGroupLabel="MSprops.deselectGroupLabel" @select="setSelectedQType" @remove="resetSelectedQType()"/>
                                </div>
                            </div>
                        </b-col>
                    </b-row>
                <!-- Linha 1: FIM -->

                <!-- Linha 2 {{ Tipo da Fila:multiselect[6] } , { Nome para FTP[6] }} -->
                    <b-row class="filas-top-section-row">
                        <b-col cols='6'>
                            <div class="profile-content user-name-line d-flex">
                                <i class="fal fa-user fa-2x" style="margin-left: 5px;" />
                                <div id="multiselect-input">
                                    <multiselect v-model="tipo_fila" :placeholder="'Tipo da Fila'" :label="'name'" :track-by="'code'" :options="filas_tipos" :multiple="true" :selectLabel="MSprops.selectLabel" :selectGroupLabel="MSprops.selectGroupLabel" :selectedLabel="MSprops.selectedLabel" :deselectLabel="MSprops.deselectLabel" :deselectGroupLabel="MSprops.deselectGroupLabel" />
                                </div>
                            </div>
                        </b-col>

                        <b-col cols='6'>
                            <div class="profile-content user-name-line d-flex">
                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                <b-form-input id="profile-name-input"  type="text" placeholder="Nome para FTP" disabled v-model="queue.slug"/>
                            </div>
                        </b-col>
                    </b-row>
                <!-- Linha 2: FIM -->

                <!-- Linha 3 {{ Finalização:dropdown[6] } , { Formato Gravação:dropdown[3] } , { Tipo:dropdown[3] }} -->
                    <b-row class="filas-top-section-row">
                        <b-col cols='6'>
                            <div class="profile-content user-name-line d-flex">
                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                <div id="multiselect-input">
                                    <multiselect v-model="tipo_finish"
                                    :taggable="true" :placeholder="'Finalização'" :label="'name'" :track-by="'code'" :options="finish_tipos" 
                                    :multiple="false" :selectLabel="MSprops.selectLabel" :selectGroupLabel="MSprops.selectGroupLabel" :selectedLabel="MSprops.selectedLabel" :deselectLabel="MSprops.deselectLabel" :deselectGroupLabel="MSprops.deselectGroupLabel" @select="setSelectedFinalization" @remove="resetSelectedFinalization()"/>
                                </div>
                            </div>
                        </b-col>

                        <b-col cols='3'>
                            <div class="profile-content user-name-line d-flex">
                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                <div id="multiselect-input">
                                    <multiselect v-model="tipo_recording" :placeholder="'Formato Gravação'" :label="'name'" :track-by="'code'" :options="recording_tipos" :multiple="false" :selectLabel="MSprops.selectLabel" :selectGroupLabel="MSprops.selectGroupLabel" :selectedLabel="MSprops.selectedLabel" :deselectLabel="MSprops.deselectLabel" :deselectGroupLabel="MSprops.deselectGroupLabel" @select="setSelectedRecFormat" @remove="resetSelectedRecFormat()"/>
                                </div>
                            </div>
                        </b-col>
                        <b-col cols='3'>
                            <div class="profile-content user-name-line d-flex">
                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                <div id="multiselect-input">
                                    <multiselect v-model="tipo_tipoSom" :placeholder="'Tipo de Gravação'" :label="'name'" :track-by="'code'" :options="tipoSom_tipos" :multiple="false" :selectLabel="MSprops.selectLabel" :selectGroupLabel="MSprops.selectGroupLabel" :selectedLabel="MSprops.selectedLabel" :deselectLabel="MSprops.deselectLabel" :deselectGroupLabel="MSprops.deselectGroupLabel"
                                    @select="setSelectedRecType" @remove="resetSelectedRecType()"/>
                                </div>
                            </div>
                        </b-col>
                    </b-row>
                <!-- Linha 3: FIM -->

                <!-- Linha 4 {{ Tempo de Pós Atendimento[6] } , { Grupo de Pausas:dropdown[6] }} -->
                    <b-row class="filas-top-section-row2">
                        <b-col cols='6'>
                            <div class="profile-content user-name-line d-flex">
                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                <b-form-input id="profile-name-input"  type="number" placeholder="Tempo de Pós Atendimento (valor INTEIRO em segundos)" v-model="wrapuptime" @change="setWrapuptime"/>
                            </div>
                        </b-col>

                        <b-col cols='6'>
                            <div class="profile-content user-name-line d-flex">
                                <i class="fal fa-user-secret fa-2x" style="margin-left: 5px;" />
                                <div id="multiselect-input">
                                    <multiselect v-model="tipo_pausegroup" :placeholder="'Grupo de Pausas'" :label="'name'" :track-by="'code'" :options="lista_de_grupos" :multiple="false" :selectLabel="MSprops.selectLabel" :selectGroupLabel="MSprops.selectGroupLabel" :selectedLabel="MSprops.selectedLabel" :deselectLabel="MSprops.deselectLabel" :deselectGroupLabel="MSprops.deselectGroupLabel" @select="fillListaDePausas" @remove="emptyListaDePausas()"/>
                                </div>
                            </div>
                        </b-col>
                    </b-row>
                <!-- Linha 4: FIM -->
            </b-col>
        </b-container>
    <!-- Seção Superior da Página: FIM -->

    <!-- Seção Média da Página (TABS) -->
        <b-container fluid id="foundIt" v-if="dataOK">
            <b-tabs justified>

                <!-- Tab 1 {Ativa por Discador} -->
                    <b-tab title="Ativa por Discador">
                        <b-container fluid>
                            <b-col cols='12'>
                                <!-- Linha 1 {{ Rota:dropdown[6] } , { Estratégia de Discagem:dropdown[6] }} -->
                                    <b-row class="tab-top-section-row">
                                        <b-col cols='6'>
                                            <div class="profile-content user-name-line d-flex">
                                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                                <div id="multiselect-input">
                                                    <multiselect v-model="tipo_rota" :placeholder="'Rota'"              :label="'name'" :track-by="'code'" :options="rota_tipos"                :multiple="false" :selectLabel="MSprops.selectLabel" :selectGroupLabel="MSprops.selectGroupLabel" :selectedLabel="MSprops.selectedLabel" :deselectLabel="MSprops.deselectLabel" :deselectGroupLabel="MSprops.deselectGroupLabel" @select="setSelectedRoute" @remove="resetSelectedRoute()"/>
                                                </div>
                                            </div>
                                        </b-col>

                                        <b-col cols='6'>
                                            <div class="profile-content user-name-line d-flex">
                                                <i class="fal fa-at fa-2x" style="margin-left: 5px;" />
                                                <!-- <b-form-input id="profile-name-input"  type="text" placeholder="Estratégia de Discagem"/> -->
                                                <div id="multiselect-input">
                                                    <multiselect v-model="tipo_strat" :placeholder="'Estratégia de Discagem'" :label="'name'" :track-by="'name'" :options="strat_tipos" :multiple="false" :selectLabel="MSprops.selectLabel" :selectGroupLabel="MSprops.selectGroupLabel" :selectedLabel="MSprops.selectedLabel" :deselectLabel="MSprops.deselectLabel" :deselectGroupLabel="MSprops.deselectGroupLabel" @select="setSelectedStrategy" @@remove="resetSelectedStrategy()"/>
                                                </div>                                                
                                            </div>
                                        </b-col>
                                    </b-row>
                                <!-- Linha 1: FIM -->

                                <!-- Linha 2 {{ Velocidade:dropdown[6] } , { Modo de Discagem:dropdown[6] }} -->
                                    <b-row class="filas-top-section-row">
                                        <b-col cols='6'>
                                            <div class="profile-content user-name-line d-flex">
                                                <i class="fal fa-user fa-2x" style="margin-left: 5px;" />
                                                <div id="multiselect-input">
                                                    <multiselect v-model="tipo_vel" :placeholder="'Velocidade'" :label="'name'" :track-by="'code'" :options="vel_tipos" :multiple="false" :selectLabel="MSprops.selectLabel" :selectGroupLabel="MSprops.selectGroupLabel" :selectedLabel="MSprops.selectedLabel" :deselectLabel="MSprops.deselectLabel" :deselectGroupLabel="MSprops.deselectGroupLabel" @select="setSelectedSpeed" @remove="resetSelectedSpeed()"/>
                                                </div>   
                                            </div>
                                        </b-col>

                                        <b-col cols='6'>
                                            <div class="profile-content user-name-line d-flex">
                                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                                <div id="multiselect-input">
                                                    <multiselect v-model="tipo_modo" :placeholder="'Modo de Discagem'" :label="'name'" :track-by="'code'" :options="modo_tipos" :multiple="false" :selectLabel="MSprops.selectLabel" :selectGroupLabel="MSprops.selectGroupLabel" :selectedLabel="MSprops.selectedLabel" :deselectLabel="MSprops.deselectLabel" :deselectGroupLabel="MSprops.deselectGroupLabel" @select="setSelectedDialFormat" @remove="resetSelectedDialFormat()"/>
                                                </div>   
                                            </div>
                                        </b-col>
                                    </b-row>
                                <!-- Linha 2: FIM -->

                                <!-- Linha 3 {{ Tempo Limite de Conversação[6] }} -->
                                    <b-row class="filas-top-section-row">
                                        <b-col cols='6'>
                                            <div class="profile-content user-name-line d-flex">
                                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                                <b-form-input id="profile-name-input"  type="number" placeholder="Tempo Limite de Conversação (valor INTEIRO em minutos)" v-model="max_time_call" @change="setMaxTimeCall"/>
                                            </div>
                                        </b-col>
                                    </b-row>
                                <!-- Linha 3: FIM -->

                                <!-- Linha 4 {{ Black Lists:multiselect[12] }} -->
                                    <b-row class="filas-top-section-row">
                                        <b-col cols='12'>
                                            <div class="profile-content user-name-line d-flex">
                                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                                <!-- <b-form-input id="profile-name-input"  type="text" placeholder="Black Lists"/> -->
                                                <div id="multiselect-input">
                                                    <multiselect v-model="tipo_blacklists" :placeholder="'Blacklists'" :label="'name'" :track-by="'code'" :options="blacklists_tipos" :multiple="true" :selectLabel="MSprops.selectLabel" :selectGroupLabel="MSprops.selectGroupLabel" :selectedLabel="MSprops.selectedLabel" :deselectLabel="MSprops.deselectLabel" :deselectGroupLabel="MSprops.deselectGroupLabel" @select="setSelectedBlacklists" @remove="resetSelectedBlacklists"/>
                                                </div>
                                            </div>
                                        </b-col>
                                    </b-row>
                                <!-- Linha 4: FIM -->
                            </b-col>
                        </b-container>
                    </b-tab>
                <!-- Tab 1 {Ativa por Discador}: FIM-->

                <!-- Tab 2 {Ativa Manual} -->
                    <b-tab title="Ativa Manual">
                        <b-container fluid>
                            <b-col cols='12'>
                                <!-- Linha 1 {{ Rota:dropdown[6] } , { Número do Bina:input+switch[6] }} -->
                                    <b-row class="tab-top-section-row">
                                        <b-col cols='6'>
                                            <div class="profile-content user-name-line d-flex">
                                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                                <div id="multiselect-input">
                                                    <multiselect v-model="tipo_rota" :placeholder="'Rota'"              :label="'name'" :track-by="'code'" :options="rota_tipos"                :multiple="false" :selectLabel="MSprops.selectLabel" :selectGroupLabel="MSprops.selectGroupLabel" :selectedLabel="MSprops.selectedLabel" :deselectLabel="MSprops.deselectLabel" :deselectGroupLabel="MSprops.deselectGroupLabel" @select="setSelectedRoute" @remove="resetSelectedRoute()"/>
                                                </div>
                                            </div>
                                        </b-col>

                                        <b-col cols='6'>
                                            <div class="profile-content user-name-line2 d-flex">
                                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                                <b-form-input id="profile-name-input2"  type="number" placeholder="Número do Bina" v-model="bina_number" @change="setBinaNumber"/>
                                                <b-form-checkbox v-model="queue.flag_bina" id="bina_switch" switch />
                                            </div>
                                        </b-col>
                                    </b-row>
                                <!-- Linha 1: FIM -->

                                <!-- Linha 2 {{ Tempo máximo de chamada - zero é sem limite[6] }} -->
                                    <b-row class="filas-top-section-row">
                                        <b-col cols='6'>
                                            <div class="profile-content user-name-line d-flex">
                                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                                <b-form-input id="profile-name-input"  type="number" placeholder="Tempo máximo de chamada (valor INTEIRO em segundos) - zero é sem limite" v-model="maxlen" @change="setMaxlen"/>
                                            </div>
                                        </b-col>
                                    </b-row>
                                <!-- Linha 2: FIM -->
                            </b-col>
                        </b-container>
                    </b-tab>
                <!-- Tab 2 {Ativa Manual}: FIM-->

                <!-- Tab 3 {Receptiva} -->
                    <b-tab title="Receptiva">
                        <b-container fluid>
                            <b-col cols='12'>
                                <!-- Linha 1 {{ Tempo máximo da fila - zero é sem limite[6] }} -->
                                   <!--  <b-row class="tab-top-section-row">
                                        <b-col cols='6'>
                                            <div class="profile-content user-name-line d-flex">
                                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                                <b-form-input id="profile-name-input"  type="text" placeholder="Tempo máximo da fila - zero é sem limite"/>
                                            </div>
                                        </b-col>
                                    </b-row> -->
                                <!-- Linha 1: FIM -->

                                <!-- Linha 2 {{ Peso da Fila - (1-2-3-4):dropdown[6] }} -->
                                    <b-row class="tab-top-section-row">
                                        <b-col cols='6'>
                                            <div class="profile-content user-name-line d-flex">
                                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                                <div id="multiselect-input">
                                                    <multiselect v-model="tipo_peso" :placeholder="'Peso da Fila - (1-2-3-4)'" :label="'name'" :track-by="'code'" :options="peso_tipos"                :multiple="false" :selectLabel="MSprops.selectLabel" :selectGroupLabel="MSprops.selectGroupLabel" :selectedLabel="MSprops.selectedLabel" :deselectLabel="MSprops.deselectLabel" :deselectGroupLabel="MSprops.deselectGroupLabel" @select="setSelectedWeight" @remove="resetSelectedWeight()"/>
                                                </div>
                                            </div>
                                        </b-col>
                                    </b-row>
                                <!-- Linha 2: FIM -->

                                <!-- Linha 3 {{ Música de espera:dropdown[6] }} -->
                                    <b-row class="filas-top-section-row">
                                        <b-col cols='6'>
                                            <div class="profile-content user-name-line d-flex">
                                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                                <!-- <b-form-input id="profile-name-input"  type="text" placeholder="Música de espera"/> -->
                                                <div id="multiselect-input">
                                                    <multiselect v-model="tipo_music" :placeholder="'Música de Espera'" :label="'name'" :track-by="'code'" :options="music_tipos"                :multiple="false" :selectLabel="MSprops.selectLabel" :selectGroupLabel="MSprops.selectGroupLabel" :selectedLabel="MSprops.selectedLabel" :deselectLabel="MSprops.deselectLabel" :deselectGroupLabel="MSprops.deselectGroupLabel" @select="setSelectedMusicOnHold" @remove="resetSelectedMusicOnHold()"/>
                                                </div>
                                            </div>
                                        </b-col>
                                    </b-row>
                                <!-- Linha 3: FIM -->
                            </b-col>
                        </b-container>
                    </b-tab>
                <!-- Tab 3 {Receptiva}: FIM-->

                <!-- Tab 4 {Horários} -->
                    <b-tab title="Horários">
                        <b-container fluid>
                            <b-col cols="6" >
                            <!-- THEAD -->
                                <b-row class="tab-top-section-row2">
                                    <b-col cols="5" class="dia-head-container">
                                        <span class="dia-head">Dias</span>
                                    </b-col>
                                    <b-col  class="empty-head-container">
                                        <span class="blank-space"/>
                                    </b-col>
                                    <b-col cols="3" class="time-head-container">
                                        <span class="time-head">Início</span>
                                    </b-col>
                                    <b-col  class="empty-head-container2">
                                        <span class="blank-space"/>
                                    </b-col>
                                    <b-col cols="3" class="time-head-container2">
                                        <span class="time-head2">Fim</span>
                                    </b-col>
                                </b-row>
                            <!-- THEAD: FIM -->

                            <!-- TBODY -->
                                <b-container fluid v-for="(d, index) in week_days" :key="d.day">
                                    <b-row :class="(index%2) == 0 ? 'grey-bg' : ''">
                                        <!-- Dias -->
                                        <b-col cols="5" class="dia-body-container">
                                            <span class="dia-body">{{d.day}}</span>
                                        </b-col>
                                        <!-- Dias: FIM -->

                                        <b-col  class="empty-body-container">
                                            <span class="blank-space"/>
                                        </b-col>

                                        <!-- Início -->
                                        <b-col cols="3" class="time-body-container">
                                            <b-input-group class="input-group-sm">
                                                <b-form-input disabled :id="d.index+'_start'"  v-model="d.start" v-mask="timeMask" max='5'  placeholder="--:--"/>
                                                <b-input-group-append id="timepicker-append">
                                                    <b-form-timepicker button-only right style="border-width: 0px !important;" size="sm" :id="d.index+'_start_picker'"  v-model="start" v-mask="timeMask" :hour12='false' @shown="start = d.start" @hidden="d.start = start"/>
                                                </b-input-group-append>
                                            </b-input-group>
                                        </b-col>
                                        <!-- Início: FIM -->

                                        <b-col  class="empty-body-container">
                                            <span class="blank-space"/>
                                        </b-col>

                                        <!-- Fim -->
                                        <b-col cols="3" class="time-body-container2">
                                            <b-input-group class="input-group-sm">
                                                <b-form-input disabled :id="d.index+'_end'" v-model="d.end" v-mask="timeMask" max='5'    placeholder="--:--"/>
                                                <b-input-group-append id="timepicker-append">
                                                    <b-form-timepicker button-only right size="sm" :id="d.index+'_end_picker'"  v-model="end" v-mask="timeMask" :hour12='false' @shown="end = d.end" @hidden="d.end = end"/>
                                                </b-input-group-append>
                                            </b-input-group>
                                        </b-col>
                                        <!-- Fim: FIM -->
                                    </b-row>
                                </b-container>
                            <!-- TBODY: FIM -->
                            </b-col>
                        </b-container>
                    </b-tab>
                <!-- Tab 4 {Horários}: FIM-->

                <!-- Tab 5 {Pausas} -->
                    <b-tab title="Pausas">
                        <tabela-pausas :items="lista_de_pausas" :editable="false" class="tab-top-section-row" v-if="pausasOK"/>
                        <div v-else fluid class="container d-flex justify-content-around tab-top-section-row">
                            <h3>{{pausa_loading_text}}</h3>
                        </div>
                    </b-tab>
                <!-- Tab 5 {Pausas}: FIM-->

                <!-- Tab 6 {Agentes} --> 
                    <b-tab title="Agentes">
                        <b-container fluid>
                            <b-col cols="12">
                            <!-- Linha 1 {{ Agentes[12] }} -->
                                <b-row class="tab-top-section-row">
                                    <b-col cols='12'>
                                            <div class="profile-content user-name-line d-flex">
                                                <i class="fal fa-user fa-2x" style="margin-left: 5px;" />
                                                <b-form-input id="profile-name-input" v-model="filtro_agentes" type="text" placeholder="Agentes"/>
                                            </div>
                                    </b-col>
                                </b-row>
                            <!-- Linha 1 {{ Agentes[12] }}: FIM -->

                            <!-- Linha 2 {{ Tabela de Seleção de Agentes[12] }} -->
                                <b-row class="tab-top-section-row">
                                    <b-col cols='12'>
                                          <tabela-agentes :items="lista_de_agentes" :filter="filtro_agentes"/>
                                    </b-col>
                                </b-row>
                            <!-- Linha 2 {{ Tabela de Seleção de Agentes[12] }}: FIM -->
                            </b-col>
                        </b-container>
                    </b-tab>
                <!-- Tab 6 {Agentes}: FIM-->
            </b-tabs>
        </b-container>
    <!-- Seção Média da Página (TABS): FIM -->

    <!-- Seção Inferior da Página (BOTÃO SALVAR) -->
        <b-container fluid class="salvar-container">
            <b-col cols='12'>
                <b-row>
                    <b-col cols='1'>
                        <b-button class="botao-salvar" @click="saveNewQueue()">SALVAR</b-button>
                    </b-col>
                    <b-col cols='10'/>
                    <b-col cols='1'>
                            <b-form-checkbox switch v-model="status" v-if="dataOK" id="status-button"><span>Status</span></b-form-checkbox>
                    </b-col>
                </b-row>
            </b-col>
        </b-container>
    <!-- Seção Inferior da Página (BOTÃO SALVAR): FIM -->
    </div>
</template>

<script>
import PagesSubHeader from '../../components/subheader/PagesSubHeader.vue';
import TabelaPausas from '../../components/PauseTable/TabelaPausas.vue';
import TabelaAgentes from '../../components/FilasTable/TabelaAgentes.vue';
import Multiselect from 'vue-multiselect';
import ValidateToaster from '../../plugins/validateToaster.js'; //importando "mixin" (no caso está na pasta plugin)
import KebabCaseFormatter from '../../plugins/kebabCaseFormatter.js'; //importando "mixin" (no caso está na pasta plugin)
import {baseApiUrl, vueMultiselectProps, defaultQueue, weekDaysByIndex} from '../../config/global.js';
import axios from 'axios'

export default {
    name: "FilasCadastro",
    mixins: [ValidateToaster,KebabCaseFormatter],
    components: {
        PagesSubHeader,
        TabelaPausas,
        TabelaAgentes,
        Multiselect
    },
    props: {
        nome:String,
        qID:{
            type:Number,
            default:-1
        }
    },
    methods: {
        formatTime(d){
            return String(d).substring(0,5);
        },
        getDataItems(){
            this.getFinalizations();
            this.getRotas();
            this.getAgentsList()
            this.checkForQID();
        },
        getFinalizations(){
            axios.get(baseApiUrl+'/finalizations')
            .then(res => {
                console.log("Status:\t",res.status," - ",res.statusText)
                let f = res.data.data;
                let items = [];
                for(let i in f){
                    let finaliz = {};
                    finaliz.name = f[i].name;
                    finaliz.code = f[i].id;
                    items.push({...finaliz});
                }
                this.finish_tipos = [...items];
            })
            .catch(error => {
                console.log("Status:\t",error.status," - ",error.message)
            })
        },
        getRotas(){
            axios.get(baseApiUrl+'/routes')
            .then(res => {
                console.log("Status:\t",res.status," - ",res.statusText);
                let r = res.data.data;
                let items = [];
                for(let i in r){
                    let rota = {};
                    rota.name = r[i].name;
                    rota.code = r[i].id;
                    items.push({...rota});
                }
                this.rota_tipos = [...items];
            })
            .catch(error => {
                console.log("Status:\t",error.status," - ",error.message);
            })
        },
        getAgentsList(){
            axios.get(baseApiUrl+'/agents')
            .then(res => {
                console.log("Status:\t",res.status," - ",res.statusText);
                let a = res.data.data;
                let lista_de_agentes = [];
                for(let i in a){
                    let agente = {};
                    agente.selected = false;
                    let name = a[i].name===a[i].agent.toString()?(a[i].name+' - '+a[i].type):(a[i].agent.toString()+' - '+a[i].name);
                    agente.agente = name;
                    agente.p0 = false;
                    agente.p1 = false;
                    agente.p2 = false;
                    lista_de_agentes.push({...agente});
                }
                this.lista_de_agentes = [...lista_de_agentes];
            })
            .catch(error => {
                console.log("Status:\t",error.status," - ",error.message);
            })
        },
        checkForQID(){
            if(this.qID > 0) this.getQDataByID(this.qID);
            else this.getQDefaultData();
        },
        getQDefaultData(){
            this.queue = {...defaultQueue};
            this.getBreakGroups();
        },
/* */        getQDataByID(id){ //Não finalizado. Falta concluir o set do objeto padrão de dados.
            let qid = id.toString();
            axios.get(baseApiUrl+'/queues/'+qid)
            .then(res => {
                console.log("Status:\t",res.status," - ",res.statusText)
                let q = res.data.data;
                let queue = {};
                
                queue.name_queue = q[0].name_queue;
                queue.queue_number = q[0].queue_number;
                queue.type = q[0].type;
                queue.q_type = [];// journey
                queue.slug = q[0].slug;
                queue.finalization_name = q[0].finalization_name;
                queue.finalization_id = q[0].finalization_id;
                queue.rec_format = [];
                queue.rec_type = [];
                queue.wrapuptime = q[0].wrapuptime;
                queue.break_group_id = q[0].break_group_id;
                
                queue.route_name = q[0].route_name;
                queue.route_id = q[0].route_id;
                queue.strategy = q[0].strategy;
                queue.speedy = q[0].speedy;
                queue.dial_format = q[0].dial_format;
                queue.max_time_call = q[0].max_time_call;
                
                queue.bina = q[0].bina;
                queue.flag_bina = q[0].flag_bina?true:false;

                queue.weight = q[0].weight;
                queue.musiconhold = q[0].musiconhold;

                let work_time = JSON.parse(q[0].work_time);
                queue.work_time = [];
                for (let i in work_time){
                    let day = {};
                    day.day = weekDaysByIndex[i];
                    day.index = i;
                    day.start = work_time[i].in;
                    day.end = work_time[i].out;
                    queue.work_time.push({...day});
                }

                // queue.pausas = this.getBreaksFromGroup(queue.break_group_id);
                this.getBreakGroups(queue.break_group_id);
                // queue.agentes = this.getAgentsList();
            })
        },
        getBreakGroups() {
            axios.get(baseApiUrl+'/breaksGroups')
            .then(res => {
                let g = res.data.data;
                let grupos = [];

                for(let i in g){
                    let grupo = {};
                    grupo.name = g[i].group_name;
                    grupo.code = g[i].group_id;
                    grupos.push({...grupo});
                }
                console.log("Grupos:\n",grupos);
                this.lista_de_grupos = [...grupos];
                this.dataOK = true;
            })
            .catch(error => {
                console.log("Status:\t",error.status," - ",error.message);
            })
        },
        getBreaksFromGroup(id) {
            let gID = id.toString();
            axios.get(baseApiUrl+'/breaksGroups/'+gID)
            .then(res => {
                let g = res.data.data;
                let pausas = [];
                let first = {};
                let items = [];

                let p = g[0].group_breaks;
                for(let i in p){
                    pausas.push(p[i].name);
                }
                first.pausas = [...pausas];
                items.push({...first});
                for(let j in g[0].group_breaks){
                    let pausa = {};
                    pausa.pausa = g[0].group_breaks[j].name;
                    pausa.produtiva = g[0].group_breaks[j].productive?true:false;
                    pausa.obrigatoria = g[0].group_breaks[j].officer?true:false;
                    pausa.alerta = g[0].group_breaks[j].time_alert===null?'':g[0].group_breaks[j].time_alert;
                    pausa.limite = g[0].group_breaks[j].time_limit===null?'00:01:00':g[0].group_breaks[j].time_limit;
                    let icon = typeof(g[0].group_breaks[j].icone)==='string'?"<i class='"+g[0].group_breaks[j].icone+"'/>":g[0].group_breaks[j].icone;
                    pausa.icone = icon;
                    pausa.icon_class = g[0].group_breaks[j].icone===null?'fal fa-ad fa-2x':g[0].group_breaks[j].icone;
                    pausa.ativa = g[0].group_breaks[j].status?true:false;
                    pausa.id = g[0].group_breaks[j].id;
                    items.push({...pausa});
                }
                console.log("\tItems:\n",items);
                this.lista_de_pausas = [...items];
                this.pausasOK = true;
            })
        },
        fillListaDePausas(value){
            console.log("Grupo de Pausas selecionado (valor):\t",value,"\tCódigo (group_id):",value.code);
            this.setSelectedBreakGroup(value);
            this.lista_de_pausas = null;
            this.pausasOK = this.pausasOK?false:this.pausasOK;
            this.pausa_loading_text = 'Aguarde, a Lista de Pausas está sendo carregada...';
            this.getBreaksFromGroup(value.code)
        },
        emptyListaDePausas(){
            this.lista_de_pausas = null;
            this.pausasOK = false;
            this.pausa_loading_text = 'Selecione um Grupo de Pausas para visualizar as Pausas pertencentes ao grupo.';
        },
        setSelectedBreakGroup(value){
            this.queue.break_group_id = value.code;
        },
        setSelectedFinalization(value){
            // console.log("Valor:\t",value,"\tCódigo (group_id):",value.code);
            this.queue.finalization_name = value.name;
            this.queue.finalization_id = value.code;
            // console.log("Tipo Finish @setSelectedFinalization():\n",this.tipo_finish)
            // console.log("Queue @setSelectedFinalization():\n",this.queue)
        },
        resetSelectedFinalization(){
            this.queue.finalization_name = '';
            this.queue.finalization_id = null;
        },
        setSelectedRoute(value){
            this.queue.route_name = value.name;
            this.queue.route_id = value.code;
            console.log("Queue @setSelectedRoute():\n",this.queue)
        },
        resetSelectedRoute(){
            this.queue.route_name = '';
            this.queue.route_id = null;
        },
        setSelectedStrategy(value){
            this.queue.strategy = value.code;
        },
        resetSelectedStrategy(){
            this.queue.strategy = '';
        },
        setSelectedSpeed(value){
            this.queue.speedy = value.code;
        },
        resetSelectedSpeed(){
            this.queue.speedy = null;
        },
        setSelectedDialFormat(value){
            this.queue.dial_format = value.code;
        },
        resetSelectedDialFormat(){
            this.queue.dial_format = '';
        },
        setSlug(value){
            this.queue.name_queue = value.trim();
            this.queue.slug = this.kebabCaseFormatter(value.trim());
        },
        setQNumber(value){
            let cleanValue = value.replace(/-|\+|\./g,'');
            this.queue.queue_number = cleanValue;
        },
        setWrapuptime(value){
            let cleanValue = value.replace(/-|\+|\./g,'');
            this.queue.wrapuptime = cleanValue;
        },
        setMaxTimeCall(value){
            let cleanValue = value.replace(/-|\+|\./g,'');
            this.queue.max_time_call = parseInt(cleanValue);
        },
        setBinaNumber(value){
            let cleanValue = value.replace(/-|\+|\./g,'');
            this.queue.bina = cleanValue;
        },
        setMaxlen(value){
            let cleanValue = value.replace(/-|\+|\./g,'');
            this.queue.maxlen = parseInt(cleanValue);
        },
        setSelectedQType(value){
            console.log("Queue Type @setSelectedQType():\n",value.code)
            console.log("Queue.q_type @setSelectedQType():\n",this.queue.q_type)
            this.queue.q_type = value.code;
        },
        resetSelectedQType(){
            this.queue.q_type = '';
        },
        setSelectedRecFormat(value){
            this.queue.rec_format = value.code;
        },
        resetSelectedRecFormat(){
            this.queue.rec_format = '';
        },
        setSelectedRecType(value){
            this.queue.rec_type = value.code;
        },
        resetSelectedRecType(){
            this.queue.rec_type = '';
        },
        setSelectedBlacklists(value){
            console.log("Blacklists @setSelectedBlacklists:\n",value)
            let item = {};
            item.blacklist_id = value.code;
            item.blacklist_name = value.name;
            this.queue.blacklists.push({...item});
        },
        resetSelectedBlacklists(value){
            let old = [...this.queue.blacklists];
            let newer = [];
            console.log("Old Blacklists @resetSelectedBlacklists:\n",old);
            for(let i in old){
                if(old[i].blacklist_id !== value.code){
                    let item = {};
                    item.blacklist_id = old[i].blacklist_id;
                    item.blacklist_name = old[i].blacklist_name;
                    newer.push({...item});
                }
                else continue;
            }
            this.queue.blacklists = null;
            this.queue.blacklists = [...newer];
            console.log("New Blacklists @resetSelectedBlacklists:\n",this.queue.blacklists)
        },
        setSelectedWeight(value){
            this.queue.weight = value.code;
        },
        resetSelectedWeight(){
            this.queue.weight = null;
        },
        setSelectedMusicOnHold(value){
            this.queue.musiconhold = value.code;
        },
        resetSelectedMusicOnHold(){
            this.queue.musiconhold = null;
        },
        saveNewQueue(){
            const blankQName = !(this.queue.name_queue.length>0)?true:false;
            const blankQNumber = !(this.queue.queue_number.length>0)?true:false;
            if(blankQName || blankQNumber){
                let toast = {
                    isValidated:false,
                    title: "NÃO FOI POSSÍVEL SALVAR A NOVA FILA",
                    message: "A Nova Fila não pôde ser criada. Não é permitido salvar uma Nova Fila com o Nome ou Número da Fila vazio ou apenas com espaços em branco.",
                };
                this.validateAndToast(toast);
                return;
            }
            else {
                let body = {};
                body.name_queue = this.queue.name_queue;
                body.name = this.queue.queue_number;
                body.type = this.queue.type;
                body.slug = this.queue.slug;
                // body.finalization_name = this.queue.finalization_name;
                body.finalization_id = this.queue.finalization_id;
                body.wrapuptime = this.queue.wrapuptime;
                body.break_group_id = this.queue.break_group_id;
                // body.route_name = this.queue.route_name;
                body.company_id = this.queue.company_id;
                body.route_id = this.queue.route_id;
                body.strategy = this.queue.strategy;
                body.speedy = this.queue.speedy;
                body.dial_format = this.queue.dial_format;
                body.max_time_call = this.queue.max_time_call;
                // body.blacklists = [...this.queue.blacklists];
                body.bina = this.queue.bina;
                body.flag_bina = this.queue.flag_bina?1:0;
                body.maxlen = this.queue.maxlen;
                body.weight = this.queue.weight;
                body.musiconhold = this.queue.musiconhold;
                body.layout = this.queue.layout;
                body.work_time = this.stringifyWorkTime();
                this.postNewQueue(body);
            }
        },
        stringifyWorkTime(){
            let timetable = [];
            let day = {in:'',out:''}
            for(let i = 0;i<7;i++){
                timetable.push({...day});
            }
            for(let j in this.queue.work_time){
                timetable[this.queue.work_time[j].index].in = this.queue.work_time[j].start;
                timetable[this.queue.work_time[j].index].out = this.queue.work_time[j].end;
            }
            return JSON.stringify(timetable);
        },
        postNewQueue(body){
            console.log("Body @postNewQueue():\n",body)
            axios.post(baseApiUrl+'/queues',body)
            .then(res => {
                console.log("Status:\t",res.status," - ",res.statusText)
                let toast = {
                    isValidated:true,
                    title:'NOVA FILA ADICIONADA',
                    message:'Nova Fila '+ body.queue_number +' - '+ body.name_queue.toUpperCase()+' adicionada com sucesso!',
                }
                this.validateAndToast(toast);
            })
            .catch(error => {
                console.log("\n\tERROR RESPONSE:\n",error.response)
                let toast = {
                    isValidated:false,
                    title:'NOVA FILA NÃO ADICIONADA',
                    message:'Nova Fila '+ body.queue_number +' - '+ body.name.toUpperCase()+' não pôde ser adicionada. Motivo: '+error.message,
                  }
                this.validateAndToast(toast);
            })
        }
    },
    created() {
        this.getDataItems();
        // this.getOperatorData();
        // this.checkForQID();
    },
    data() {
        return {
            status: true,
            dataOK:false,
            pausasOK:false,
            queue:null,
            pausa_loading_text:'Selecione um Grupo de Pausas para visualizar as Pausas pertencentes ao grupo.',
            start:'',
            end:'',
            timeMask:'##:##',
            bina_flag:false,
            bina_number:'',
            filtro_agentes:'',
            MSprops:vueMultiselectProps,
            queue_number:'',
            name_queue:'',
            wrapuptime:'',
            max_time_call:'',
            maxlen:'',
            week_days:[
                {
                    day:"Segunda-feira",
                    index:1,
                    start:'09:00',
                    end:'21:00'
                },
                {
                    day:"Terça-feira",
                    index:2,
                    start:'08:00',
                    end:'21:00'
                },
                {
                    day:"Quarta-feira",
                    index:3,
                    start:'08:00',
                    end:'21:00'
                },
                {
                    day:"Quinta-feira",
                    index:4,
                    start:'08:00',
                    end:'21:00'
                },
                {
                    day:"Sexta-feira",
                    index:5,
                    start:'08:00',
                    end:'21:00'
                },
                {
                    day:"Sábado",
                    index:6,
                    start:'08:00',
                    end:'21:00'
                },
                {
                    day:"Domingo",
                    index:0,
                    start:'',
                    end:''
                },
            ],
            lista_de_pausas:null,
            /* [
                {   
                    pausas: ["Banheiro","OVNI"]
                },
                {
                    pausa:"Banheiro",
                    produtiva: true,
                    obrigatoria: true,
                    alerta:'00:00:30',
                    limite: '00:01:00',
                    icone: '<i class="fal fa-restroom fa-2x"/>',
                    ativa: true,
                    add: '<span class="fal fa-trash-alt"/>',
                    id:"00001"
                },
                {
                    pausa:"OVNI",
                    produtiva: false,
                    obrigatoria: true,
                    alerta:'00:01:00',
                    limite: '00:02:00',
                    icone: '<i class="fal fa-alien fa-2x"/>',
                    ativa: false,
                    add: '<span class="fal fa-trash-alt"/>',
                    id:"00002"
                }
            ] */
            lista_de_grupos:null,
            lista_de_agentes:null,
            /* [
                {
                    selected:false,
                    agente:"Agente 1",
                    p0:false,
                    p1:true,
                    p2:false
                },
                {
                    selected:false,
                    agente:"Agente 2",
                    p0:false,
                    p1:false,
                    p2:false
                }
            ] */
            tipo_fila:[],
            tipo_finish:[],
            tipo_recording:[],
            tipo_tipoSom:[],
            tipo_pausegroup:[],
            tipo_rota:[],
            tipo_strat:[],
            tipo_vel:[],
            tipo_modo:[],
            tipo_blacklists:[],
            tipo_peso:[],
            tipo_humano:[],
            tipo_music:[],
            filas_tipos:[
                {name:"Ativa",  code:'active'},
                {name:"Manual", code:'manual'},
                {name:"Receptiva", code:'receptive'}
            ],
            finish_tipos:[
                {name:"Ativa",  code:"A"},
                {name:"Manual", code:"M"},
                {name:"Recebe", code:"R"}
            ],
            recording_tipos:[
                {name:".mp3",  code:"1"},
                {name:".wav", code:"2"},
                {name:".flac", code:"3"}
            ],
            tipoSom_tipos:[
                {name:"Mono",  code:1},
                {name:"Stereo", code:2}
            ],
            rota_tipos:null,
            // [
            //     {name:"Ativa",  code:"A"},
            //     {name:"Manual", code:"M"},
            //     {name:"Recebe", code:"R"}
            // ],
            strat_tipos:[
                {name:'Ordem de Entrada no Sistema',  code:'rrmemory'},
                {name:'Aleatório', code:'random'},
                {name:'Menos Chamadas', code:'fewestcall'},
                {name:'Mais Antigo', code:'leastrecent'},
                {name:'Maior Número de Atendimentos', code:'roundrobin'},
                {name:'Chamar Todos', code:'ringall'}
            ], 
            vel_tipos:[
                {name:"1",  code:1},
                {name:"2", code:2},
                {name:"3", code:3},
                {name:"4", code:4},
                {name:"5", code:5},
                {name:"6", code:6},
                {name:"7", code:7},
                {name:"8", code:8},
                {name:"9", code:9},
                {name:"10", code:10}
            ],
            modo_tipos:[
                {name:'Horizontal', code:'horizontal'},
                {name:'Vertical', code:'vertical'}
            ],
            peso_tipos:[
                {name:"1", code:1},
                {name:"2", code:2},
                {name:"3", code:3},
                {name:"4", code:4}
            ],
            music_tipos:[
                {name:"Beethoven", code:"beethoven"},
                {name:"Mozart", code:"mozart"},
                {name:"Queen", code:"queen"}
            ],
            blacklists_tipos:[
                {name:"Lista Proibida 1", code:'1'},
                {name:"Lista Proibida 2", code:'2'},
                {name:"Lista Proibida 3", code:'3'}
            ],
            humano_tipos:[
                {name:"Humano", code:"human"},
                {name:"Robô", code:"robot"}
            ],
        }
    }
};
</script>


<style scoped>
.tab-pane.active{
    border-width: 2px !important;
    border-color: black !important;
}
div.tabs>div>ul.nav.nav-tabs.nav-justified>li.nav-item>a.nav-link {
    background-color: whitesmoke !important;
    text-decoration: none !important;
}

div#timepicker-append>div>button{
    border: none;
}

.grey-bg{
    border-bottom-width: 2px;
    background-color: rgba(13,109,165,0.08);}

div.container-fluid>div.col-6>div.container-fluid, div.container-fluid>div.col-6>div.row, div.tab-pane.active>div.container-fluid>div.col-6{
    padding-left: 0;
    padding-right: 0;
}

.dia-head-container, .produtiva-head-container, .obrigatoria-head-container, .alerta-head-container, .limite-head-container, .icone-head-container, .ativa-head-container{
    display: flex;
    align-items: center;
    /* ajuste de margens da tabela */
    padding: 5px;
    padding-left: 0px;
}

.dia-head-container {
    padding-right: 5px;
    margin-left: -15px;
}

.time-body-container{
    display: flex;
    align-items: center;
    /* ajuste de margens da tabela */
    padding-left: 5px;
    padding-right: 0px;
    margin-left: -8px;
    margin-right: -4px;
}
.time-body-container2{
    display: flex;
    align-items: center;
    /* ajuste de margens da tabela */
    padding-left: 0px;    padding-right: 5px;
    margin-right: -5px;
}

.time-head-container{
    display: flex;
    align-items: center;
    /* ajuste de margens da tabela */
    padding-left: 0px;
    padding-right: 0px;
    justify-content: center;
    margin-left:20px;
}
.time-head-container2{
    display: flex;
    align-items: center;
    /* ajuste de margens da tabela */
    padding-left: 0px;
    padding-right: 0px;
    justify-content: center;
    margin-right: -7px;
}

.dia-head {
    background-color: #0d6d9d !important;
    color:#fff !important;
    border-color: #0d6d9d !important;
    width: 100%;
    padding-left: 2ch;
    text-align: left;
    vertical-align: middle !important;
}

.dia-body-container{
    display: flex;
    align-items: left;
    /* ajuste de margens da tabela */
    padding: 5px;
    padding-left: 2ch;
    /* padding-right: 0px; */
}

.blank-space{
    background-color: white !important;
    width: 100%;
}

/* .dia-body {
    margin-left: 2ch;
} */

.empty-head-container.col{
    min-width:20px;
}
.empty-head-container2.col{
    max-width:7px;
}
.empty-body-container.col{
    min-width:5px;
    background-color: white ;
    margin-left: -14px;
    margin-right: -10px;
}

.time-head {
    background-color: #0d6d9d !important;
    color:#fff !important;
    border-color: #0d6d9d !important;
    width: 100%;
    padding-left: 0ch;
    text-align: center;
    vertical-align: middle !important;
    margin-left: -35px;
    margin-right: -6px;
}

.time-head2 {
    background-color: #0d6d9d !important;
    color:#fff !important;
    border-color: #0d6d9d !important;
    width: 100%;
    padding-left: 0ch;
    text-align: center;
    vertical-align: middle !important;
    margin-left: -9px;
    margin-right: -6px;
}

.salvar-container{
    margin-top: 5px;
    bottom: 0;
}
.filas-top-section-row {
    margin-bottom: 1ch;
}
.filas-top-section-row2 {
    margin-bottom: 3ch;
}
.tab-top-section-row {
    margin-top: 2.5ch;
    margin-bottom: 1ch;
}

.tab-top-section-row2 {
    margin-top: 2.5ch;
    /* margin-bottom: 1ch; */
    margin-left: 0px;
    margin-right: -9px;
}

.head-items{
    align-content: center;
    align-items: center;
}
/* .profile-content {
    margin-top: 5px;
    margin-bottom: 5px;
} */
.botao-salvar{
    background-color: #0d6d9dad;
}
.botao-salvar:hover{
    background-color: #0d6d9d;
}
.card-body.spacer{
    padding: 5px;
    height: 50px;
    width: 0;
    border: 0px;
    color: #ffffff transparent;
}
.card.spacer{
    box-shadow: none;
    border: none;
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
    /* border-top-width: 2px;
    border-bottom-width: 2px; */
    height: 42px;
    border-color: #d0cece;
    padding-left: 0%;
    padding-right: 0%;
}
#profile-name-input{
    margin-left: 5px;
    margin-right: 0px;
    border-left-color: black;
    border-radius: 0px;
}
#profile-name-input2{
    margin-left: 5px;
    margin-right: 0px;
    border-left-color: black;
    border-radius: 0px;
    border-right-width: 0px;
    border-top-width: 0px;
    border-bottom-width: 0px;
}
#multiselect-input{
    display: flex;
    width: 100%;
    margin-left: 6px;
}
.input-group-sm > .form-control{
    font-size: 13px !important;
}
/* #profile-name-input>.multiselect>.multiselect__tags{
    border-radius: 0px !important;
    border-left-width: 1px !important;
    border-left-color: black;
    width: 100%;
} */

i.fal.fa-2x {
    width: 26px;
    height: 26px;
}

.tab-content {
    border-left: 1px solid green;
    border-right: 1px solid green;
    padding: 10px;
}

.nav-tabs {
    margin-bottom: 0;
}
</style>