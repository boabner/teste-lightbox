import React, { useState } from "react";
import {Helmet} from 'react-helmet';
import style from './App.module.scss';

export default function App() {

    const [code, setCode] = useState('');

    function abrirModal(event) {
        event.preventDefault();
      
        console.log('abrirModal');
        //Insira o código de checkout gerado no Passo 1
        var callback = {
            success : function(transactionCode) {
                //Insira os comandos para quando o usuário finalizar o pagamento.
                //O código da transação estará na variável "transactionCode"
                console.log('Compra feita com sucesso, código de transação: ' + transactionCode);
            },
            abort : function() {
                //Insira os comandos para quando o usuário abandonar a tela de pagamento.
                console.log('abortado');
            }
        };
        //Chamada do lightbox passando o código de checkout e os comandos para o callback
        //Ignorar o erro
        var isOpenLightbox = PagSeguroLightbox(code, callback);
      
        console.log(isOpenLightbox);
      }
    
    return (
        <section className={style.app}> 
            <Helmet>
                <script src="https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.lightbox.js" type="text/javascript" />
            </Helmet>
            <div className={style.app__content}>

                <p>
                    <label className={style.app__label}>
                        Krasnodar Team
                    </label>
                </p>
                
                <input
                    className={style.app__input}
                    type="text"
                    value={code}
                    required
                    maxLength={40}
                    placeholder="Code"
                    onChange={(e) => setCode(e.target.value)}
                />

                <button 
                    type="button"
                    onClick={ e => abrirModal(e)}
                    className={style.app__button}
                >
                    Iniciar Lightbox
                </button>
            </div>
        </section>
    );
}