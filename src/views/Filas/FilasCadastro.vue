<template>
    <div class="relatorios">        
        <pages-sub-header icon="fal fa-road" titulo="Cadastro de Filas">
            <div class="card spacer">
                <div class="card-body spacer"/>
            </div>
        </pages-sub-header>
    <!-- Seção Superior da Página -->
        <b-container fluid>
            <b-col cols='12'>
                <!-- Linha 1 {{ Nome[6] } , { Numero da Fila[3] } , { Tipo (Humano x Robô)[3] }} -->
                    <b-row class="filas-top-section-row">
                        <b-col cols='6'>
                            <div class="profile-content user-name-line d-flex">
                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                <b-form-input id="profile-name-input"  type="text" placeholder="Nome"/>
                            </div>
                        </b-col>

                        <b-col cols='3'>
                            <div class="profile-content user-name-line d-flex">
                                <i class="fal fa-at fa-2x" style="margin-left: 5px;" />
                                <b-form-input id="profile-name-input"  type="text" placeholder="Número da Fila"/>
                            </div>
                        </b-col>
                        <b-col cols='3'>
                            <div class="profile-content user-name-line d-flex">
                                <i class="fal fa-at fa-2x" style="margin-left: 5px;" />
                                <b-form-input id="profile-name-input"  type="text" placeholder="Tipo (Humano x Robô)"/>
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
                                    <multiselect v-model="tipo_fila" :placeholder="'Tipo da Fila'" :label="'name'" :track-by="'code'" :options="filas_tipos" :multiple="true"/>
                                </div>
                            </div>
                        </b-col>

                        <b-col cols='6'>
                            <div class="profile-content user-name-line d-flex">
                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                <b-form-input id="profile-name-input"  type="text" placeholder="Nome para FTP"/>
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
                                    <multiselect v-model="tipo_finish" :placeholder="'Finalização'" :label="'name'" :track-by="'code'" :options="finish_tipos" :multiple="false"/>
                                </div>
                            </div>
                        </b-col>

                        <b-col cols='3'>
                            <div class="profile-content user-name-line d-flex">
                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                <div id="multiselect-input">
                                    <multiselect v-model="tipo_recording" :placeholder="'Formato Gravação'" :label="'name'" :track-by="'code'" :options="recording_tipos" :multiple="false"/>
                                </div>
                            </div>
                        </b-col>
                        <b-col cols='3'>
                            <div class="profile-content user-name-line d-flex">
                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                <div id="multiselect-input">
                                    <multiselect v-model="tipo_tipo" :placeholder="'Tipo'" :label="'name'" :track-by="'code'" :options="tipo_tipos" :multiple="false"/>
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
                                <b-form-input id="profile-name-input"  type="text" placeholder="Tempo de Pós Atendimento"/>
                            </div>
                        </b-col>

                        <b-col cols='6'>
                            <div class="profile-content user-name-line d-flex">
                                <i class="fal fa-user-secret fa-2x" style="margin-left: 5px;" />
                                <div id="multiselect-input">
                                    <multiselect v-model="tipo_pausegroup" :placeholder="'Grupo de Pausas'"  :options="lista_de_pausas[0].pausas" :multiple="false"/>
                                </div>
                            </div>
                        </b-col>
                    </b-row>
                <!-- Linha 4: FIM -->
            </b-col>
        </b-container>
    <!-- Seção Superior da Página: FIM -->

    <!-- Seção Média da Página (TABS) -->
        <b-container fluid id="foundIt">
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
                                                    <multiselect v-model="tipo_rota" :placeholder="'Rota'"              :label="'name'" :track-by="'code'" :options="rota_tipos"                :multiple="false"/>
                                                </div>
                                            </div>
                                        </b-col>

                                        <b-col cols='6'>
                                            <div class="profile-content user-name-line d-flex">
                                                <i class="fal fa-at fa-2x" style="margin-left: 5px;" />
                                                <!-- <b-form-input id="profile-name-input"  type="text" placeholder="Estratégia de Discagem"/> -->
                                                <div id="multiselect-input">
                                                    <multiselect v-model="tipo_strat" :placeholder="'Estratégia de Discagem'" :label="'name'" :track-by="'code'" :options="strat_tipos" :multiple="false"/>
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
                                                    <multiselect v-model="tipo_vel" :placeholder="'Velocidade'" :label="'name'" :track-by="'code'" :options="vel_tipos" :multiple="false"/>
                                                </div>   
                                            </div>
                                        </b-col>

                                        <b-col cols='6'>
                                            <div class="profile-content user-name-line d-flex">
                                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                                <div id="multiselect-input">
                                                    <multiselect v-model="tipo_modo" :placeholder="'Modo de Discagem'" :label="'name'" :track-by="'code'" :options="modo_tipos" :multiple="false"/>
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
                                                <b-form-input id="profile-name-input"  type="text" placeholder="Tempo Limite de Conversação"/>
                                            </div>
                                        </b-col>
                                    </b-row>
                                <!-- Linha 3: FIM -->

                                <!-- Linha 4 {{ Black Lists:multiselect[12] }} -->
                                    <b-row class="filas-top-section-row">
                                        <b-col cols='12'>
                                            <div class="profile-content user-name-line d-flex">
                                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                                <b-form-input id="profile-name-input"  type="text" placeholder="Black Lists"/>
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
                                                    <multiselect v-model="tipo_rota" :placeholder="'Rota'"              :label="'name'" :track-by="'code'" :options="rota_tipos"                :multiple="false"/>
                                                </div>
                                            </div>
                                        </b-col>

                                        <b-col cols='6'>
                                            <div class="profile-content user-name-line2 d-flex">
                                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                                <b-form-input id="profile-name-input2"  type="text" placeholder="Número do Bina"/>
                                                <b-form-checkbox v-model="bina_number" id="bina_switch" switch />
                                            </div>
                                        </b-col>
                                    </b-row>
                                <!-- Linha 1: FIM -->

                                <!-- Linha 2 {{ Tempo máximo de chamada - zero é sem limite[6] }} -->
                                    <b-row class="filas-top-section-row">
                                        <b-col cols='6'>
                                            <div class="profile-content user-name-line d-flex">
                                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                                <b-form-input id="profile-name-input"  type="text" placeholder="Tempo máximo de chamada - zero é sem limite"/>
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
                                    <b-row class="tab-top-section-row">
                                        <b-col cols='6'>
                                            <div class="profile-content user-name-line d-flex">
                                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                                <b-form-input id="profile-name-input"  type="text" placeholder="Tempo máximo da fila - zero é sem limite"/>
                                            </div>
                                        </b-col>
                                    </b-row>
                                <!-- Linha 1: FIM -->

                                <!-- Linha 2 {{ Peso da Fila - (1-2-3-4):dropdown[6] }} -->
                                    <b-row class="filas-top-section-row">
                                        <b-col cols='6'>
                                            <div class="profile-content user-name-line d-flex">
                                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                                <div id="multiselect-input">
                                                    <multiselect v-model="tipo_peso" :placeholder="'Peso da Fila - (1-2-3-4)'" :label="'name'" :track-by="'code'" :options="peso_tipos"                :multiple="false"/>
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
                                                    <multiselect v-model="tipo_music" :placeholder="'Música de Espera'" :label="'name'" :track-by="'code'" :options="music_tipos"                :multiple="false"/>
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
                        <tabela-pausas :items="lista_de_pausas" class="tab-top-section-row"/>
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
        <b-container fluid class="salvar-container">
            <b-col cols='12'>
                <b-row>
                    <b-col cols='1'>
                        <b-button class="botao-salvar">SALVAR</b-button>
                    </b-col>
                    <b-col cols='10'/>
                    <b-col cols='1'>
                        <label><b-form-checkbox switch v-model="status"><span>Status</span></b-form-checkbox></label>
                    </b-col>
                </b-row>
            </b-col>
        </b-container>
    </div>
</template>

<script>
import PagesSubHeader from '../../components/subheader/PagesSubHeader.vue';
import TabelaPausas from '../../components/PauseTable/TabelaPausas.vue';
import TabelaAgentes from '../../components/FilasTable/TabelaAgentes.vue';
import Multiselect from 'vue-multiselect';

export default {
    name: "FilasCadastro",
    components: {
        PagesSubHeader,
        TabelaPausas,
        TabelaAgentes,
        Multiselect
    },
    props: {
        nome:String
    },
    methods: {
        formatTime(d){
            return String(d).substring(0,5);
        }
    },
    computed(){
        return{
            // pausegroup_tipos = [...this.lista_de_pausas.slice(1,this.lista_de_pausas.length)]
        }
    },
    data() {
        return {
            status: true,
            start:'',
            end:'',
            timeMask:'##:##',
            bina_number:false,
            filtro_agentes:'',
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
            lista_de_pausas:[
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
            ],
            lista_de_agentes:[
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
            ],
            tipo_fila:[],
            tipo_finish:[],
            tipo_recording:[],
            tipo_tipo:[],
            tipo_pausegroup:[],
            tipo_rota:[],
            tipo_strat:[],
            tipo_vel:[],
            tipo_modo:[],
            tipo_peso:[],
            music_tipo:[],
            filas_tipos:[
                {name:"Ativa",  code:"A"},
                {name:"Manual", code:"M"},
                {name:"Recebe", code:"R"}
            ],
            finish_tipos:[
                {name:"Ativa",  code:"A"},
                {name:"Manual", code:"M"},
                {name:"Recebe", code:"R"}
            ],
            recording_tipos:[
                {name:"Ativa",  code:"A"},
                {name:"Manual", code:"M"},
                {name:"Recebe", code:"R"}
            ],
            tipo_tipos:[
                {name:"Ativa",  code:"A"},
                {name:"Manual", code:"M"},
                {name:"Recebe", code:"R"}
            ],
            rota_tipos:[
                {name:"Ativa",  code:"A"},
                {name:"Manual", code:"M"},
                {name:"Recebe", code:"R"}
            ],
            strat_tipos:[
                {name:"Ativa",  code:"A"},
                {name:"Manual", code:"M"},
                {name:"Recebe", code:"R"}
            ],
            vel_tipos:[
                {name:"Ativa",  code:"A"},
                {name:"Manual", code:"M"},
                {name:"Recebe", code:"R"}
            ],
            modo_tipos:[
                {name:"Ativa",  code:"A"},
                {name:"Manual", code:"M"},
                {name:"Recebe", code:"R"}
            ],
            peso_tipos:[
                {name:"1", code:1},
                {name:"2", code:2},
                {name:"3", code:3},
                {name:"4", code:4}
            ],
            music_tipos:[
                {name:"Beethoven", code:1},
                {name:"Mozart", code:2},
                {name:"Queen", code:3}
            ]
            

            
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