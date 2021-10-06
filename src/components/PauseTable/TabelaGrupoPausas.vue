<template>
    <div class="pausas">
        <b-table id="tabela-grupo-pausas" :ref="'tabela-de-pausas'" class="tabela-grupo-pausas table-sm table-hover table-striped w-100 dt-responsive dtr-inline" :items="grupos" :responsive="true" :fields="fields" sticky-header sort-icon-left>
            <template v-slot:head(grupo)="data">
                <span>{{data.label}}</span>
            </template>
            <template v-slot:head(action)="data"> 
                <span>{{data.label}}</span>
            </template>
            
            
            <template v-slot:cell(grupo)="slot">
                <span :id="'_grupo'">{{slot.value}}</span>
            </template>
            <template v-slot:cell(action)="slot">
                <b-button :id="slot.item.grupo + '_edit'" class="edit-btn" variant="outline"  v-b-modal="slot.item.grupo+'_edit_modal'" @mousedown="showEdit($event,slot.item)" v-html="editIcon"/>
                <b-btn :id="slot.item.grupo + '_add'" v-html="deleteIcon" class="add-btn" variant="outline" v-b-modal="slot.item.grupo+'_delete_modal'"/>
            </template>                
        </b-table>
<!-- ---------------------------------------------------- -->
        <div v-for="i in grupos" :key="i.grupo+'_modals'">
        <!-- MODAL PARA Edição DE LINHA (INÍCIO) -->
        <b-modal 
            :id="i.grupo+'_edit_modal'"
            :ref="i.grupo+'_edit_modal'"
            :title="'Editar Grupo de Pausas: '+i.grupo"
            size="xl"
            :hide-header-close="true"
            :no-close-on-backdrop="true"
            :no-close-on-esc="true"
            :lazy="true"
            :ok-only="true"
            ok-title="SALVAR"
            ok-variant="info" 
            @ok="updateRow($event,i)"
            @show="cancelEdit(editRowInput)"
            >
            <b-container fluid>
                    <b-col cols="12">
                        <b-row id="novo_grupo_pausa">
                            <b-col cols="12">
                                <b-form-input v-model="i.grupo" :id="'new_row_group'" type="text" @input="inputTest" placeholder="Nome do Novo Grupo de Pausas"/>
                            </b-col>
                        </b-row>
                    </b-col>
                    
                    <b-col cols="4">
                        <b-container fluid>
                            <b-row>
                                <b-col cols="12" class="pausa-head-container">
                                    <span class="pausa-head">Pausas do Grupo</span>
                                </b-col>
                            </b-row>

                            <b-container fluid v-for="(p, index) in i.pausas" :key="i.grupo+'_'+p" >
                               <b-row :class="(index%2) == 0 ? 'grey-bg' : ''">
                                   <b-col cols="10" class="pausa-head-container">
                                       <span class="pausa-body">{{p}}</span>
                                   </b-col>
                                   <b-col cols="2" class="ativa-head-container">
                                       <b-form-checkbox v-model="i.ativas[index]" :id="p  +'_edit_row_ativa'" :value="true" :unchecked-value="false"/>
                                   </b-col>
                               </b-row>
                            </b-container>
                        </b-container>
                    </b-col>
                </b-container>
            </b-modal>
        <!-- MODAL PARA Edição DE LINHA (FIM) -->
<!-- ---------------------------------------------------- -->
        <!-- MODAL PARA EXCLUSÃO DE LINHA (INÍCIO) -->
            <b-modal 
                :id="i.grupo+'_delete_modal'" 
                title="ATENÇÃO!!!"
                :hide-header-close="false"
                :no-close-on-backdrop="false"
                :no-close-on-esc="false"
                :lazy="true"
                ok-title="EXCLUIR"
                ok-variant="danger" 
                cancel-title="MANTER" 
                cancel-variant="success"
                @ok="deleteRow(i.grupo)">
                       Tem certeza que deseja excluir o grupo de pausas <b>{{i.grupo}}</b>?
            </b-modal>
        </div>
        <!-- MODAL PARA EXCLUSÃO DE LINHA (FIM) -->
<!-- ---------------------------------------------------- -->
        <!-- MODAL PARA CRIAR NOVA LINHA (INÍCIO) -->
        <b-modal 
            id="new_line"
            refs="new_line"
            title="Adicionar Novo Grupo de Pausas"
            size="xl"
            :hide-header-close="false"
            :no-close-on-backdrop="false"
            :no-close-on-esc="false"
            
            ok-title="ADICIONAR"
            ok-variant="success" 
            cancel-title="CANCELAR" 
            cancel-variant="danger"
            @ok="okayFunc"
            @hide="addNewRow">
                <b-container fluid>
                    <b-col cols="12">
                        <b-row id="novo_grupo_pausa">
                            <b-col cols="12">
                                <b-form-input v-model="newRowInput.grupo" :id="'new_row_group'" type="text" @input="inputTest" placeholder="Nome do Novo Grupo de Pausas"/>
                            </b-col>
                        </b-row>
                    </b-col>
                    
                    <b-col cols="4">
                        <b-container fluid>
                            <b-row>
                                <b-col cols="12" class="pausa-head-container">
                                    <span class="pausa-head">Pausas do Grupo</span>
                                </b-col>
                            </b-row>

                            <b-container fluid v-for="(p, index) in newRowInput.pausas" :key="newRowInput.grupo+'_'+p" >
                               <b-row :class="(index%2) == 0 ? 'grey-bg' : ''">
                                   <b-col cols="10" class="pausa-head-container">
                                       <span class="pausa-body">{{p}}</span>
                                   </b-col>
                                   <b-col cols="2" class="ativa-head-container">
                                       <b-form-checkbox v-model="newRowInput.ativas[index]" :id="p  +'_new_row_ativa'" :value="true" :unchecked-value="false"/>
                                   </b-col>
                               </b-row>
                            </b-container>
                        </b-container>
                    </b-col>
                </b-container>
        </b-modal>
        <!-- MODAL PARA CRIAR NOVA LINHA (FIM) -->
<!-- ---------------------------------------------------- -->
    </div>
</template>

<script>
const pausasDefault={
                grupo:'',
                pausas:['Banheiro', 'Lanche', 'NR', 'Treinamento'],
                ativas:[false,false,false,false],
            };

export default {
    name:'TabelaGrupoPausas',
    props:{
        items: Array,
        filters: String,
    },
    methods: {
        deleteRow(g){ //recebe nome do grupo e apaga da lista de grupos de pausas local
            const i = this.gruposNames.indexOf(g);
            this.gruposNames.splice(i,1);
            this.grupos.splice(i,1);
            this.gruposDePausas.splice(0,-1);
            this.gruposDePausas = [...this.grupos]
        },
        inputTest(){ //exibe texto sendo editado no campo de "Nome do Grupo de Pausas" do modal
            console.log("Editing New Row Input....")
            console.log(this.newRowInput.grupo)
        },
        okayFunc(){
            console.clear()
            console.log('OK')
            if (this.okays == 0){
                console.log("Grupos ok:")
                console.log(this.gruposDePausas)
                console.log("New Row Input:")
                console.log(this.newRowInput)
                this.okays = 1;
            }
        },
        addNewRow(){
            if (this.okays>0){
                console.log("ADD NEW ROW")
                this.grupos.push(Object.assign({},this.newRowInput));
                this.gruposDePausas.push(Object.assign({},this.newRowInput));
                let sub = JSON.stringify(Object.assign(this.newRowInput.grupo.toString()));
                console.log("sub:\t",sub)
                this.gruposNames.push(sub.slice(1,sub.length - 1));
                console.log("Grupos: \n",this.gruposDePausas)
                console.log("Nomes dos Grupos: \n",this.gruposNames)
                this.okays = -1;
            }
            console.log(this.newRowInput)
            this.clearNewRow();
        },
        clearNewRow(){
            console.log("Clear???")
            console.log((this.okays<0))

            if ((this.okays<0) || (JSON.stringify(this.newRowDefault) !== JSON.stringify(this.newRowInput))){
                console.log("Clear on Button")
                this.newRowInput = {...this.newRowDefault}
                this.okays = 0;
            }
            console.log("Grupos de Pausas: \n",this.gruposDePausas);
            console.log("Grupos: \n",this.grupos);
        },
        showEdit(ev,i){
            console.log("Show Edit")
            console.log(i)
            console.log('Edit Row on ShowEdit():\n',this.editRowInput);
            this.cancelEdit(this.editRowInput);
            setTimeout(this.populateEditLine(i),1000);
        },
        populateEditLine(row){
            console.log("Row item:\n",row);
            console.log("Row Pausa:\t",row.pausa)
            for (let k in this.editRowInput) delete this.editRowInput[k];
            console.log("Empty editRowInput:\n",this.editRowInput);
            this.editRowInput = Object.assign({},row);
            console.log("editRowInput @populateEditLine:\n",this.editRowInput)
            if (JSON.stringify(this.editRowInput) === JSON.stringify(row)) this.modalData = true;
        },
        /* Rever Método */
        updateRow(ev,row){
            console.log("Close Edit Event @updateRow():\n",ev)
            
            var p = this.pausas.indexOf(row.pausa);
            this.editRowInput.pausa = this.editRowInput.pausa.trim();          
            
            console.log("Pausas antes de deletar:\n",this.pausas)
            /* Apagando dados da Fila na posição editada */
            this.deleteRow2(p);
            console.log("Pausas depois de deletar:\n",this.pausas)
            
            /* Atualizando Fila e Pausas com dados editados */
            this.filas.splice(p,0,{...this.editRowInput});
            this.pausas.splice(p,0, this.editRowInput.pausa);
            
            console.log("Filas atualizadas (???):\n",this.filas);
            console.log("Pausas atualizada:\n",this.pausas)
            
            this.closeEdit();
        },
        /* Rever Método */
        closeEdit(){
            console.log("tudo certo nada resolvido ainda...")
            this.editRowInput = Object.assign(this.newRowDefault);
            console.log("editRowInput @closeEdit:\n",this.editRowInput)
            console.log(this.filas)
            this.modalData = false;
            console.log("Fim de closeEdit...")
        },
        /* Rever Método */
        cancelEdit(eri){
            var e = eri;
            for (let k in this.editRowInput) delete this.editRowInput[k];
            this.editRowInput = Object.assign({},this.newRowDefault);
            e = Object.assign({},this.newRowDefault);
            console.log("editRowInput @cancelEdit:\n",this.editRowInput);
            console.log("e:\n",e)
        }
    },
    created(){
        this.getGrupos = function(){
            let g =[];
            for (let i in this.items){
                g.push(this.items[i].grupo);
            }
            return g;
        },
        // this.grupos = this.items;
        this.gruposNames = this.getGrupos();
        this.gruposDePausas = [...this.grupos];
        this.newRowDefault = {...pausasDefault};
        this.newRowInput = Object.assign({},this.newRowDefault);
    },
    watch:{
        // grupos(newValue){
        //     localStorage.setItem('__pedro-dev', JSON.stringify(newValue));
        // }
    },
    mounted(){
        // this.grupos = JSON.parse(localStorage.getItem('__pedro-dev'));
    },
    data(){
        return {
            grupos: this.items,
            okays: 0,
            modalData: false,
            thisLine: {},
            editIcon: '<span class="fal fa-pencil"/>',
            deleteIcon: '<span class="fal fa-trash-alt"/>',
            // pausas: this.items[0].pausas,
            dummy: [],
            icons: [{value:'i1', html:'<span class="fal fa-trash-alt"/>'},
                    {value:'i2', html:'<span class="fal fa-plus"/>'},
                    {value:'i3', html:'<span class="fal fa-air-conditioner"/>'},
                    {value:'i4', html:'<span class="fal fa-abacus"/>'}],
            // pivotRow: this.filas,
            fields: [
                {
                    key:'grupo',
                    label: 'Nome do Grupo de Pausas',
                    sortable: true,
                },
                {
                    key:'action',
                    label: 'Ação',
                    sortable: false
                }
            ],
            
        }
    }
}
</script>

<style >
div#novo_grupo_pausa{
    margin-bottom: 2rem;
}
.grey-bg{
    background-color: rgba(0,0,0,0.05);
}
span.fal{
    pointer-events: none;
}

.add-btn>i, .edit-btn>i{
    padding: 0px !important;
    border-width: 0px 1px !important;
    display: flex;
    align-content: center;
    justify-content: center;
}

.add-btn, .edit-btn{
    display: table-cell;
    align-items: center !important;
    border-width: 1px 1px !important;
    border-color: #adadad;
    width: 42px;
    height: 42px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

#new_row_limite, #new_row_alerta {
    width: 100%;
    padding: 0.2ch;
    text-align: center;
}

/* div.container-fluid>div.row{
    margin: 0;
} */

.pausa-head-container, .produtiva-head-container, .obrigatoria-head-container, .alerta-head-container, .limite-head-container, .icone-head-container, .ativa-head-container{
    display: flex;
    /* padding-left: 2px !important;
    padding-right: 2px !important; */
}

.pausa-head {
    background-color: #0d6d9d !important;
    color:#fff !important;
    border-color: #0d6d9d !important;
    width: 100%;
    padding-left: 2ch;
    text-align: left;
    vertical-align: middle !important;
}

.produtiva-head, .obrigatoria-head, .alerta-head, .limite-head, .icone-head, .ativa-head{
    background-color: #0d6d9d !important;
    color:#fff !important;
    border-color: #0d6d9d !important;
    width: 100%;
    padding-left: 0ch;
    text-align: center;
    vertical-align: middle !important;
    justify-content: center !important;
}


.pausa-body-container, .produtiva-body-container, .obrigatoria-body-container, .alerta-body-container, .limite-body-container, .icone-body-container, .ativa-body-container {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    padding-left: 2px !important;
    padding-right: 2px !important;
}


.tabela-grupo-pausas > .table.b-table.table-sm > thead > tr > [aria-sort]:not(.b-table-sort-icon-left), .tabela-grupo-pausas > .table.b-table.table-sm > tfoot > tr > [aria-sort]:not(.b-table-sort-icon-left) {
background-position: right calc(0.3rem / 2) bottom 10px;
padding-right: calc(0.3rem + 0.65em);
}
.tabela-grupo-pausas > .table.b-table > thead > tr > [aria-sort=none], .tabela-grupo-pausas > .table.b-table > tfoot > tr > [aria-sort=none] {
background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' opacity='.3' d='M51 1l25 23 24 22H1l25-22zM51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e") !important;

}
.tabela-grupo-pausas > .table.b-table > thead > tr > [aria-sort=ascending], .tabela-grupo-pausas > .table.b-table > tfoot > tr > [aria-sort=ascending] {
background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='white' opacity='.3' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e");
}
.tabela-grupo-pausas > .table.b-table > thead > tr > [aria-sort=descending], .tabela-grupo-pausas > .table.b-table > tfoot > tr > [aria-sort=descending] {
background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='white' opacity='.3' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='white' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e");
}
.tabela-grupo-pausas > .table.b-table > thead > tr > .table-b-table-default {
background-color: #0d6d9d !important;
color:#fff !important;
border-color: #0d6d9d !important;
align-items: center !important;
align-content: center !important;
text-align: center;
vertical-align: middle !important;
}

/* .tabela-grupo-pausas > .table.b-table > tbody > tr > [aria-colindex="8"], .tabela-grupo-pausas > .table.b-table > thead > tr > [aria-colindex="8"]{
    width: 3.5%;
    text-align: center;
}
.tabela-grupo-pausas > .table.b-table > tbody > tr > [aria-colindex="7"],[aria-colindex="6"], .tabela-grupo-pausas > .table.b-table > thead > tr > [aria-colindex="7"],[aria-colindex="6"]{
    width: 3%;
    text-align: center;
    justify-content: center;
    display: table-cell;
}
.tabela-grupo-pausas > .table.b-table > tbody > tr > [aria-colindex="5"],[aria-colindex="4"], .tabela-grupo-pausas > .table.b-table > thead > tr > [aria-colindex="5"],[aria-colindex="4"]{
    width: 6%;
    text-align: center;
} */
.tabela-grupo-pausas > .table.b-table > tbody > tr > [aria-colindex="2"], .tabela-grupo-pausas > .table.b-table > thead > tr >[aria-colindex="2"]{
    width: 8%;
    text-align: center;
}
.tabela-grupo-pausas > .table.b-table > tbody > tr > [aria-colindex="1"], .tabela-grupo-pausas > .table.b-table > thead > tr > [aria-colindex="1"]{
    /* width: 94%; */
    text-align: left !important;
}
/* .tabela-grupo-pausas > .table.b-table > tbody > tr > [aria-colindex="1"], .tabela-grupo-pausas > .table.b-table > thead > tr > [aria-colindex="1"]{
 
} */

#editar-pausas > .table.b-table > tbody > tr > [aria-colindex="8"], #editar-pausas > .table.b-table > thead > tr > [aria-colindex="8"] {
    display: none !important;
}
</style>