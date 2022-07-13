import React, { useState } from "react";
import {Helmet} from 'react-helmet';
import style from './App.module.scss';
import { obterAutorizacao } from "./services/app-services.tsx";

export default function App() {

    const [code, setCode] = useState('');
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');

    async function obterCodigoAutorizacao(event) {

        const response = await obterAutorizacao(
            {
                'email': email,
                'token': token,
                'currency':'BRL',
                'itemId1':'0001',
                'itemDescription1':'Notebook Prata',
                'itemAmount1':'24300.00',
                'itemQuantity1':'1',
                'itemWeight1':'1000',
                'reference':'REF1234',
                'senderName': 'Krasnodar',
                'senderEmail': email,
                'shippingType':'1',
                'shippingAddressStreet':'Av. Brig. Faria Lima',
                'shippingAddressNumber':'1384',
                'shippingAddressComplement':'5o andar',
                'shippingAddressDistrict':'Jardim Paulistano',
                'shippingAddressPostalCode':'01452002',
                'shippingAddressCity':'Sao Paulo',
                'shippingAddressState':'SP',
                'shippingAddressCountry':'BRA',
                'redirectURL': 'http://www.seusite.com.br'
            },
            email,
            token
        ).then((sucesso) => {
           console.log(sucesso);
        }).catch((erro) => {
           
        });
    }

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
                    value={email}
                    required
                    maxLength={40}
                    placeholder="E-mail"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className={style.app__input}
                    type="text"
                    value={token}
                    required
                    maxLength={40}
                    placeholder="Token"
                    onChange={(e) => setToken(e.target.value)}
                />

                <button 
                    type="button"
                    onClick={ e => obterCodigoAutorizacao(e)}
                    className={style.app__button}
                >
                    Obter autorização
                </button>

                <hr/>

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