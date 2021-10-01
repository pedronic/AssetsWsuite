<template>
    <div class="relatorios">        
        <pages-sub-header icon="fal fa-road" titulo="Cadastro de Filas">
            <div class="card">
                <div class="card-body"/>
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

                <!-- Linha 2 {{ Tipo da Fila[6] } , { Nome para FTP[6] }} -->
                    <b-row class="filas-top-section-row">
                        <b-col cols='6'>
                            <div class="profile-content user-name-line d-flex">
                                <i class="fal fa-user fa-2x" style="margin-left: 5px;" />
                                <!-- <b-form-input id="profile-name-input"  type="text" placeholder="Tipo da Fila"/> -->
                                <b-form-select :options="filas_tipos" id="profile-name-input" v-model="filas_selected">
                                    <!-- <template #first>
                                        <b-form-select-option value="" disabled>-- Tipo da Fila --</b-form-select-option>
                                    </template> -->
                                </b-form-select>
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

                <!-- Linha 3 {{ Finalização[6] } , { Formato Gravação[3] } , { Tipo[3] }} -->
                    <b-row class="filas-top-section-row">
                        <b-col cols='6'>
                            <div class="profile-content user-name-line d-flex">
                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                <b-form-input id="profile-name-input"  type="text" placeholder="Finalização"/>
                            </div>
                        </b-col>

                        <b-col cols='3'>
                            <div class="profile-content user-name-line d-flex">
                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                <b-form-input id="profile-name-input"  type="text" placeholder="Formato Gravação"/>
                            </div>
                        </b-col>
                        <b-col cols='3'>
                            <div class="profile-content user-name-line d-flex">
                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                <b-form-input id="profile-name-input"  type="text" placeholder="Tipo"/>
                            </div>
                        </b-col>
                    </b-row>
                <!-- Linha 3: FIM -->

                <!-- Linha 4 {{ Tempo de Pós Atendimento[6] } , { Grupo de Pausas[6] }} -->
                    <b-row class="filas-top-section-row">
                        <b-col cols='6'>
                            <div class="profile-content user-name-line d-flex">
                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                <b-form-input id="profile-name-input"  type="text" placeholder="Tempo de Pós Atendimento"/>
                            </div>
                        </b-col>

                        <b-col cols='6'>
                            <div class="profile-content user-name-line d-flex">
                                <i class="fal fa-user-secret fa-2x" style="margin-left: 5px;" />
                                <b-form-input id="profile-name-input"  type="text" placeholder="Grupo de Pausas"/>
                            </div>
                        </b-col>
                    </b-row>
                <!-- Linha 4: FIM -->
            </b-col>
        </b-container>
    <!-- Seção Superior da Página: FIM -->

    <!-- Seção Inferior da Página (TABS) -->
        <b-container fluid>
            <b-tabs justified>

                <!-- Tab 1 {Ativa por Discador} -->
                    <b-tab title="Ativa por Discador">
                        <b-container fluid>
                            <b-col cols='12'>
                                <!-- Linha 1 {{ Rota[6] } , { Estratégia de Discagem[6] }} -->
                                    <b-row class="tab-top-section-row">
                                        <b-col cols='6'>
                                            <div class="profile-content user-name-line d-flex">
                                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                                <b-form-input id="profile-name-input"  type="text" placeholder="Rota"/>
                                            </div>
                                        </b-col>

                                        <b-col cols='6'>
                                            <div class="profile-content user-name-line d-flex">
                                                <i class="fal fa-at fa-2x" style="margin-left: 5px;" />
                                                <b-form-input id="profile-name-input"  type="text" placeholder="Estratégia de Discagem"/>
                                            </div>
                                        </b-col>
                                    </b-row>
                                <!-- Linha 1: FIM -->

                                <!-- Linha 2 {{ Velocidade[6] } , { Modo de Discagem[6] }} -->
                                    <b-row class="filas-top-section-row">
                                        <b-col cols='6'>
                                            <div class="profile-content user-name-line d-flex">
                                                <i class="fal fa-user fa-2x" style="margin-left: 5px;" />
                                                <b-form-input id="profile-name-input"  type="text" placeholder="Velocidade"/>
                                            </div>
                                        </b-col>

                                        <b-col cols='6'>
                                            <div class="profile-content user-name-line d-flex">
                                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                                <b-form-input id="profile-name-input"  type="text" placeholder="Modo de Discagem"/>
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

                                <!-- Linha 4 {{ Black Lists[12] }} -->
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
                                <!-- Linha 1 {{ Rota[6] } , { Número do Bina[6] }} -->
                                    <b-row class="tab-top-section-row">
                                        <b-col cols='6'>
                                            <div class="profile-content user-name-line d-flex">
                                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                                <b-form-input id="profile-name-input"  type="text" placeholder="Rota"/>
                                            </div>
                                        </b-col>

                                        <b-col cols='6'>
                                            <div class="profile-content user-name-line d-flex">
                                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                                <b-form-input id="profile-name-input"  type="text" placeholder="Número do Bina"/>
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

                                <!-- Linha 2 {{ Peso da Fila - (1-2-3-4)[6] }} -->
                                    <b-row class="filas-top-section-row">
                                        <b-col cols='6'>
                                            <div class="profile-content user-name-line d-flex">
                                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                                <b-form-input id="profile-name-input"  type="text" placeholder="Peso da Fila - (1-2-3-4)"/>
                                            </div>
                                        </b-col>
                                    </b-row>
                                <!-- Linha 2: FIM -->

                                <!-- Linha 3 {{ Música de espera[6] }} -->
                                    <b-row class="filas-top-section-row">
                                        <b-col cols='6'>
                                            <div class="profile-content user-name-line d-flex">
                                                <i class="fal fa-ad fa-2x" style="margin-left: 5px;" />
                                                <b-form-input id="profile-name-input"  type="text" placeholder="Música de espera"/>
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
                                <b-row class="tab-top-section-row2">
                                    <b-col cols="6" class="dia-head-container">
                                        <span class="dia-head">Dias</span>
                                    </b-col>
                                    <b-col cols="3" class="dia-head-container">
                                        <span class="time-head">Início</span>
                                    </b-col>
                                    <b-col cols="3" class="dia-head-container">
                                        <span class="time-head">Fim</span>
                                    </b-col>
                                </b-row>

                                <b-container fluid v-for="(d, index) in week_days" :key="d.day">
                                    <b-row :class="(index%2) == 0 ? 'grey-bg' : ''">
                                        <b-col cols="6" class="dia-head-container">
                                            <span class="dia-body">{{d.day}}</span>
                                        </b-col>
                                        <b-col cols="3" class="dia-head-container">
                                            <b-input-group>
                                                <b-form-input disabled :id="d.index+'_start'"  v-model="d.start" v-mask="timeMask" placeholder="--:--"/>
                                                <b-input-group-append>
                                                    <b-form-timepicker button-only right :id="d.index+'_start_picker'"  v-model="start" v-mask="timeMask" :hour12='false' @shown="start = d.start" @hidden="d.start = start.slice(0,5)"/>
                                                </b-input-group-append>
                                            </b-input-group>
                                        </b-col>
                                        <b-col cols="3" class="dia-head-container">
                                            <b-input-group>
                                                <b-form-input disabled :id="d.index+'_end'" v-model="d.end" v-mask="timeMask" placeholder="--:--"/>
                                                <b-input-group-append>
                                                    <b-form-timepicker button-only right :id="d.index+'_end_picker'"  v-model="end" v-mask="timeMask" :hour12='false' @shown="end = d.end" @hidden="d.end = end.slice(0,5)"/>
                                                </b-input-group-append>
                                            </b-input-group>
                                        </b-col>
                                    </b-row>
                                </b-container>
                            </b-col>
                        </b-container>
                    </b-tab>
                <!-- Tab 4 {Horários}: FIM-->

                <!-- Tab 5 {Pausas} -->
                    <b-tab title="Pausas">
                        <tabela-pausas :items="lista_de_pausas"/>
                    </b-tab>
                <!-- Tab 5 {Pausas}: FIM-->

                <!-- Tab 6 {Agentes} --> <!-- INSERIR COMPONENTE CRIADO PELO MARCONI NA LINHA 2 -->
                    <b-tab title="Agentes">
                        <b-container fluid>
                            <b-col cols="12">
                            <!-- Linha 1 {{ Agentes[12] }} -->
                                <b-row class="tab-top-section-row">
                                    <b-col cols='12'>
                                            <div class="profile-content user-name-line d-flex">
                                                <i class="fal fa-user fa-2x" style="margin-left: 5px;" />
                                                <b-form-input id="profile-name-input"  type="text" placeholder="Agentes"/>
                                            </div>
                                    </b-col>
                                </b-row>
                            <!-- Linha 1 {{ Agentes[12] }}: FIM -->

                            <!-- Linha 2 {{ Tabela de Seleção de Agentes ```usar componente criado pelo Marconi´´´[12] }} -->
                                <b-row class="tab-top-section-row">
                                    <b-col cols='12'>
                                          <!--  <tabela-de-agentes-do-Marconi/> -->
                                    </b-col>
                                </b-row>
                            <!-- Linha 2 {{ Tabela de Seleção de Agentes[12] }}: FIM -->
                            </b-col>
                        </b-container>
                    </b-tab>
                <!-- Tab 6 {Agentes}: FIM-->
            </b-tabs>
        </b-container>
    <!-- Seção Inferior da Página (TABS): FIM -->

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

export default {
    name: "FilasCadastro",
    components: {
        PagesSubHeader,
        TabelaPausas
    },
    props: {
        nome:String
    },
    methods: {
    },
    data() {
        return {
            status: true,
            start:'',
            end:'',
            timeMask:'##:##',
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
                }
            ],
            filas_tipos:[
                // {value:null, text:"Tipo da Fila"},
                {value:"Ativa", text:"Ativa"},
                {value:"Manual", text:"Manual"},
                {value:"Recebe", text:"Recebe"}
            ],
            filas_selected:[{value:null, text:"Tipo da Fila"}]
        }
    }
};
</script>

<style scoped>
.grey-bg{
    background-color: rgba(0,0,0,0.05);
}

div.container-fluid>div.col-6>div.container-fluid, div.container-fluid>div.col-6>div.row, div.tab-pane.active>div.container-fluid>div.col-6{
    padding-left: 0;
    padding-right: 0;
}

.dia-head-container, .produtiva-head-container, .obrigatoria-head-container, .alerta-head-container, .limite-head-container, .icone-head-container, .ativa-head-container{
    display: flex;
    align-items: center;
    /* padding-left: 2px !important;
    padding-right: 2px !important; */
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

.time-head {
    background-color: #0d6d9d !important;
    color:#fff !important;
    border-color: #0d6d9d !important;
    width: 100%;
    padding-left: 0ch;
    text-align: center;
    vertical-align: middle !important;
}

.salvar-container{
    margin-top: 5px;
    bottom: 0;
}
.filas-top-section-row {
    margin-bottom: 1ch;
}

.tab-top-section-row {
    margin-top: 2.5ch;
    margin-bottom: 1ch;
}

.tab-top-section-row2 {
    margin-top: 2.5ch;
    /* margin-bottom: 1ch; */
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
.card-body{
    padding: 5px;
    height: 50px;
    width: 0;
    border: 0px;
    color: #ffffff transparent;
}
.card{
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
#profile-name-input{
    margin-left: 5px;
    margin-right: 0px;
    border-left-color: black;
    border-radius: 0px;
}

i.fal.fa-2x {
    width: 26px;
    height: 26px;
}
</style>