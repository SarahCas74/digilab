'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">digilab documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-1c1299d58ea13854dd2ae42cfce386fa303808c2907468afe011667c0f7ad675417e9fc44524e3c76fa3d38e71136ca439f6a5c56a9afd6c4cc7e11a289e80c0"' : 'data-target="#xs-components-links-module-AppModule-1c1299d58ea13854dd2ae42cfce386fa303808c2907468afe011667c0f7ad675417e9fc44524e3c76fa3d38e71136ca439f6a5c56a9afd6c4cc7e11a289e80c0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-1c1299d58ea13854dd2ae42cfce386fa303808c2907468afe011667c0f7ad675417e9fc44524e3c76fa3d38e71136ca439f6a5c56a9afd6c4cc7e11a289e80c0"' :
                                            'id="xs-components-links-module-AppModule-1c1299d58ea13854dd2ae42cfce386fa303808c2907468afe011667c0f7ad675417e9fc44524e3c76fa3d38e71136ca439f6a5c56a9afd6c4cc7e11a289e80c0"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChatComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChatModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChatroomComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatroomComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DirectoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DirectoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DirectoryModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DirectoryModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FinderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FinderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OverviewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OverviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfilComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfilComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TopbarchatComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TopbarchatComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WeatherComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WeatherComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WeatherModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WeatherModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-AppModule-1c1299d58ea13854dd2ae42cfce386fa303808c2907468afe011667c0f7ad675417e9fc44524e3c76fa3d38e71136ca439f6a5c56a9afd6c4cc7e11a289e80c0"' : 'data-target="#xs-pipes-links-module-AppModule-1c1299d58ea13854dd2ae42cfce386fa303808c2907468afe011667c0f7ad675417e9fc44524e3c76fa3d38e71136ca439f6a5c56a9afd6c4cc7e11a289e80c0"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-1c1299d58ea13854dd2ae42cfce386fa303808c2907468afe011667c0f7ad675417e9fc44524e3c76fa3d38e71136ca439f6a5c56a9afd6c4cc7e11a289e80c0"' :
                                            'id="xs-pipes-links-module-AppModule-1c1299d58ea13854dd2ae42cfce386fa303808c2907468afe011667c0f7ad675417e9fc44524e3c76fa3d38e71136ca439f6a5c56a9afd6c4cc7e11a289e80c0"' }>
                                            <li class="link">
                                                <a href="pipes/AgePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AgePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/MessageModel.html" data-type="entity-link" >MessageModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoomModel.html" data-type="entity-link" >RoomModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserModel.html" data-type="entity-link" >UserModel</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/DataserviceService.html" data-type="entity-link" >DataserviceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/DialogData.html" data-type="entity-link" >DialogData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DialogData-1.html" data-type="entity-link" >DialogData</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});