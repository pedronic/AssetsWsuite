<template>
  <div>
                                <a href="#" class="header-icon" data-toggle="dropdown" title="Você recebeu 11 notificações" aria-expanded="false">
                                    <i class="fal fa-bell"></i>
                                    <span class="badge badge-icon"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">1</font></font></span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-animated dropdown-xl" style="">
                                    <div class="dropdown-header bg-trans-gradient d-flex justify-content-center align-items-center rounded-top mb-2">
                                        <h4 class="m-0 text-center color-white"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                                            11 novos
                                            </font></font><small class="mb-0 opacity-80"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Notificações de usuário</font></font></small>
                                        </h4>
                                    </div>
                                    <ul class="nav nav-tabs nav-tabs-clean" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link px-4 fs-md js-waves-on fw-500 waves-effect waves-themed" data-toggle="tab" href="#tab-messages" data-i18n="drpdwn.messages"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Mensagens</font></font></a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link px-4 fs-md js-waves-on fw-500 waves-effect waves-themed" data-toggle="tab" href="#tab-feeds" data-i18n="drpdwn.feeds"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Feeds</font></font></a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link px-4 fs-md js-waves-on fw-500 waves-effect waves-themed active" data-toggle="tab" href="#tab-events" data-i18n="drpdwn.events"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Eventos</font></font></a>
                                        </li>
                                    </ul>
                                    <div class="tab-content tab-notification">
                                        <div class="tab-pane p-3 text-center">
                                            <h5 class="mt-4 pt-4 fw-500">
                                                <span class="d-block fa-3x pb-4 text-muted">
                                                    <i class="ni ni-arrow-up text-gradient opacity-70"></i>
                                                </span><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> Selecione uma guia acima para ativar
                                                </font></font><small class="mt-3 fs-b fw-400 text-muted"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                                                    Esta mensagem de página em branco ajuda a proteger sua privacidade, ou você pode mostrar a primeira mensagem aqui automaticamente por meio da
                                                     </font></font><a href="#"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">página de configurações</font></font></a>
                                                </small>
                                            </h5>
                                        </div>
                                        <div class="tab-pane" id="tab-messages" role="tabpanel">
                                            <div class="custom-scroll h-100">
                                                <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 100%;"><ul class="notification" style="overflow: hidden; width: auto; height: 100%;">
                                                    <!-- <li class="unread">
                                                        <a href="#" class="d-flex align-items-center">
                                                            <span class="status mr-2">
                                                                <span class="profile-image rounded-circle d-inline-block" style="background-image:url('img/demo/avatars/avatar-c.png')"></span>
                                                            </span>
                                                            <span class="d-flex flex-column flex-1 ml-1">
                                                                <span class="name"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Melissa Ayre </font></font><span class="badge badge-primary fw-n position-absolute pos-top pos-right mt-1"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">CAIXA DE ENTRADA</font></font></span></span>
                                                                <span class="msg-a fs-sm"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Re: Novos códigos de segurança</font></font></span>
                                                                <span class="msg-b fs-xs"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Olá de novo e obrigado por fazer parte ...</font></font></span>
                                                                <span class="fs-nano text-muted mt-1"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">56 segundos atrás</font></font></span>
                                                            </span>
                                                        </a>
                                                    </li> -->
                                                    
                                                    <li class="unread">
                                                        <a href="#" class="d-flex align-items-center">
                                                            <span class="mr-2">
                                                                Em Construção
                                                            </span>
                                                            
                                                        </a>
                                                    </li>
                                                    
                                                </ul>
                                                <div class="slimScrollBar" style="background: rgba(0, 0, 0, 0.6); width: 4px; position: absolute; top: 0px; opacity: 0.4; display: none; border-radius: 7px; z-index: 99; right: 4px; height: 225.632px;"></div><div class="slimScrollRail" style="width: 4px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(250, 250, 250); opacity: 0.2; z-index: 90; right: 4px;"></div></div>
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="tab-feeds" role="tabpanel">
                                            <div class="custom-scroll h-100">
                                                <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 100%;">
                                                    <ul class="notification" style="overflow: hidden; width: auto; height: 100%;">
                                                    <li class="unread">
                                                        <div class="d-flex align-items-center show-child-on-hover">
                                                            <span class="d-flex flex-column flex-1">
                                                                <span class="name d-flex align-items-center"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Administrador </font></font><span class="badge badge-success fw-n ml-1"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">ATUALIZAR</font></font></span></span>
                                                                <span class="msg-a fs-sm"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                                                                    Sistema atualizado para a versão </font></font><strong><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">0.4.1</font></font></strong> <a href="docs_buildnotes.html"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">(notas de patch)</font></font></a>
                                                                </span>
                                                                <span class="fs-nano text-muted mt-1"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">5 minutos atrás</font></font></span>
                                                            </span>
                                                            <div class="show-on-hover-parent position-absolute pos-right pos-bottom p-3">
                                                                <a href="#" class="text-muted" title="excluir"><i class="fal fa-trash-alt"></i></a>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    
                                                </ul><div class="slimScrollBar" style="background: rgba(0, 0, 0, 0.6); width: 4px; position: absolute; top: 0px; opacity: 0.4; display: block; border-radius: 7px; z-index: 99; right: 4px;"></div><div class="slimScrollRail" style="width: 4px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(250, 250, 250); opacity: 0.2; z-index: 90; right: 4px;"></div></div>
                                            </div>
                                        </div>
                                        <div class="tab-pane active" id="tab-events" role="tabpanel">
                                            <div class="d-flex flex-column h-100">
                                                <div class="h-auto">
                                                    <table class="table table-bordered table-calendar m-0 w-100 h-100 border-0">
                                                        <tbody><tr>
                                                            <th colspan="7" class="pt-3 pb-2 pl-3 pr-3 text-center">
                                                                <div class="js-get-date h5 mb-2"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Em Construção</font></font></div>
                                                            </th>
                                                        </tr>
                                                    </tbody></table>
                                                </div>
                                                <div class="flex-1 custom-scroll">
                                                    <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 100%;"><div class="p-2" style="overflow: hidden; width: auto; height: 100%;">
                                                        <div class="d-flex align-items-center text-left mb-3">
                                                            
                                                            
                                                        </div>
                                                    </div><div class="slimScrollBar" style="background: rgba(0, 0, 0, 0.6); width: 4px; position: absolute; top: 0px; opacity: 0.4; display: block; border-radius: 7px; z-index: 99; right: 4px;"></div><div class="slimScrollRail" style="width: 4px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(250, 250, 250); opacity: 0.2; z-index: 90; right: 4px;"></div></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="py-2 px-3 bg-faded d-block rounded-bottom text-right border-faded border-bottom-0 border-right-0 border-left-0">
                                        <a href="#" class="fs-xs fw-500 ml-auto"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">ver todas as notificações</font></font></a>
                                    </div>
                                </div>
                            </div>
</template>

<script>
export default {
    nome: "NotifyHeader"
}
</script>

<style>

</style>