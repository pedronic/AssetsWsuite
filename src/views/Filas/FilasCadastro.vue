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
                                <b-form-input id="profile-name-input"  type="text" placeholder="Tipo da Fila"/>
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

    <!-- Seção Inferior da Página -->
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
                    </b-tab>
                <!-- Tab 4 {Horários}: FIM-->

                <!-- Tab 5 {Pausas} -->
                    <b-tab title="Pausas">
                    </b-tab>
                <!-- Tab 5 {Pausas}: FIM-->

                <!-- Tab 6 {Agentes} -->
                    <b-tab title="Agentes">
                    </b-tab>
                <!-- Tab 6 {Agentes}: FIM-->
            </b-tabs>
        </b-container>
    <!-- Seção Inferior da Página: FIM -->

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

export default {
    name: "FilasCadastro",
    components: {
        PagesSubHeader,
    },
    props: {
        nome:String
    },
 
  data() {
        return {
            status: true,
        }
    }
};
</script>

<style scoped>
.salvar-container{
    bottom: 0;
}
.filas-top-section-row {
    margin-bottom: 1ch;
}

.tab-top-section-row {
    margin-top: 2.5ch;
    margin-bottom: 1ch;
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