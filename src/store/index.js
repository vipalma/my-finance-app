import React from "react";
import useGlobalHook from "use-global-hook";
import * as actions from "../actions";
import { dropdownMonthList } from '../helpers/date.js';


const initialState = {
  fireBase: {},
  user: {},
  drawer: {open: true},
  chartWrapper: null,
  intl: actions.actIntl.initIntlProvider(),
  selectedDate: [],
  dropdownMonthList: dropdownMonthList(),
  analise: [],
  categoriasDropDown: [],
  categoriasAll: [],
  modalMoviment: { open: false, data: {} },
  modalCategoria: { open: false, data: {} },
  modalTpConta: { open: false, data: {} },
  tipoConta: [],
  saldoTotal: [],
  saldoConta: [],
  projetado:[],
  projetadoConfig:[],
  modalProjetado: { open: false, data: {} },
  realProjetado: [],
  prediction: [],
  tipoMov: [ {value: 'S', text: 'Saída'}, {value: 'E', text: 'Entrada'}],
  fechamentos: [],
  periodDropDown: [ {key: 1, value: 1, text:"Mensal" },
                    {key: 2, value: 2, text:"Bimestral" },
                    {key: 3, value: 3, text:"Trimestral" },
                    {key: 6, value: 6, text:"Semestral" },
                    {key: 12, value: 12, text:"Anual" },
                  ],
};


const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;
