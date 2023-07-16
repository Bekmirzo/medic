patients_button.onclick = () => {
    showLoadingAlert();
    axios({
        method: 'post',
        url: `${HOST}/dashboard/v1/`,
        data: {
            method: "patient_view",
            params: {

            }
        }
    }).then((res) => {

        if (res.data.data.status) {
            renderPatiens(res.data.data.data)
        }
    }).catch((e) => {
        toastr.error('Xatolik yuz berdi');
        main_page_header.innerHTML = `Bemorlar`;
        console.log(e)
    });

};


let usersDataTableAPI = null;



async function get_diagnos_by_id(id) {
    return axios({
        method: 'post',
        url: `${HOST}/dashboard/v1/`,
        data: {
            "method": "diagnoz_view",
            "params": {
                "id": id
            }
        }
    }).then((res) => {

        if (res.data.status) {
            return res.data.data
        }
    }).catch((e) => {
        toastr.error('Xatolik yuz berdi');
        main_page_header.innerHTML = `Diagnozlar`;
        return e;
    })
};

async function get_recipe_all() {
    return axios({
        method: 'post',
        url: `${HOST}/dashboard/v1/`,
        data: {
            "method": "retsep_view",
            "params": {

            }
        }
    }).then((res) => {

        if (res.data.status) {
            return res.data.data
        }
    }).catch((e) => {
        toastr.error('Xatolik yuz berdi');
        main_page_header.innerHTML = `Diagnozlar`;
        return e;
    })
};

async function get_patient_by_id(id) {
    return axios({
        method: 'post',
        url: `${HOST}/dashboard/v1/`,
        data: {
            "method": "patient_view",
            "params": {
                "id": id
            }
        }
    }).then((res) => {

        if (res.data.data.status) {
            return res.data.data.data
        }
    }).catch((e) => {
        toastr.error('Xatolik yuz berdi');
        main_page_header.innerHTML = `Bemorlar`;
        return e;
    })
};


async function renderDiagnose(patient) {

    sessionStorage.setItem('steep', `diagnose`);

    const data = patient.diagnoz;


    main_page_header.innerHTML = `Diagnozlar`;
    title.innerHTML = `Diagnozlar`;

    main_page.innerHTML =
        `
            <div class="card card-outline card-info">
                <div class="card-header" id="card_header">
                    <h3 class="card-title">
                        <button id="back_btn" type="button" class="btn btn-primary">
                            <i class="fas fa-angle-left"></i> Ortga
                        </button>
                        &nbsp;<b>${patient.father_name} ${patient.first_name} ${patient.name}</b>
                    </h3>
                </div>
                <div class="card-body" id="card_body">
                    Start creating your amazing application!
                </div>
                <!-- /.card-body -->
                <div id="card_footer" class="card-footer">
                
                </div>
                <!-- /.card-footer-->
            </div>
        
 
    `;

    const back_btn = document.getElementById('back_btn');

    back_btn.onclick = async (e) => {

        showLoadingAlert();

        patients_button.click();
    };

    const card_body = document.getElementById('card_body');
    const card_footer = document.getElementById('card_footer');

    card_body.innerHTML =
        `
    <table id="diagnose_datable" class="table table-sm table-bordered table-striped table-hover table-head-fixed text-center">
        <thead>
            <tr>
              <th style="Width:100px">ID</th>
              <th>Diagnoz</th>
              <th>Sana</th>
              <th style="Width:100px"></th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    `;

    const tbody = main_page.getElementsByTagName('table')[0].children[1];


    for (let i = 0; i < data.length; i++) {
        const diagnoz = data[i];

        const patient = await get_patient_by_id(diagnoz.patient)


        const tr = document.createElement('tr');


        tr.innerHTML =
            `
            <td>${diagnoz.Id}</td>
            <td>${diagnoz.diagnoz}</td>
            <td>${diagnoz.date}</td>
    
            <td>
                <button type="button" class="btn btn-info btn-sm dt_icons dt_view" p_id="${diagnoz.Id}">
                    <i class="far fa-eye dt_icons dt_view" p_id="${diagnoz.Id}"></i>
                </button>&nbsp;
                <button type="button" class="btn btn-danger btn-sm dt_icons dt_delete" p_id="${diagnoz.Id}">
                    <i class="fas fa-trash-alt dt_icons dt_delete" p_id="${diagnoz.Id}"></i>
                </button>&nbsp;
                <button type="button" class="btn btn-warning btn-sm dt_icons dt_edit" p_id="${diagnoz.Id}">
                    <i class="fas fa-edit dt_icons dt_edit" p_id="${diagnoz.Id}"></i>
                </button>
            </td>
            `;
        tbody.appendChild(tr);
    }


    $(function () {
        $("#diagnose_datable").DataTable(
            {
                "responsive": true,
                "lengthChange": true,
                "autoWidth": false,
                "order": [[0, 'desc']],
                "buttons": [
                    {
                        text: `<i  class="fas fa-plus"></i>  Qo'shish`,
                        action: addDiagnose
                    }]
            }
        ).buttons().container().appendTo('#main_page .col-md-6:eq(0)');
    });

    async function get_diagnos_by_id(id) {
        return axios({
            method: 'post',
            url: `${HOST}/dashboard/v1/`,
            data: {
                "method": "diagnoz_view",
                "params": {
                    "id": id
                }
            }
        }).then((res) => {

            if (res.data.status) {
                return res.data.data
            }
        }).catch((e) => {
            toastr.error('Xatolik yuz berdi');
            main_page_header.innerHTML = `Diagnozlar`;
            return e;
        })
    };

    async function get_recipe_all() {
        return axios({
            method: 'post',
            url: `${HOST}/dashboard/v1/`,
            data: {
                "method": "retsep_view",
                "params": {

                }
            }
        }).then((res) => {

            if (res.data.status) {
                return res.data.data
            }
        }).catch((e) => {
            toastr.error('Xatolik yuz berdi');
            main_page_header.innerHTML = `Diagnozlar`;
            return e;
        })
    };

    async function get_reciepe_by_id(id) {
        return axios({
            method: 'post',
            url: `${HOST}/dashboard/v1/`,
            data: {
                "method": "retsep_view",
                "params": {
                    "id": id
                }
            }
        }).then((res) => {

            if (res.data.status) {
                return res.data.data
            }
        }).catch((e) => {
            toastr.error('Xatolik yuz berdi');
            main_page_header.innerHTML = `Diagnozlar`;
            return e;
        })
    }

    tbody.onclick = async (e) => {

        if (e.target.classList.contains('dt_icons')) {
            const p_id = e.target.getAttribute('p_id');
            if (e.target.classList.contains('dt_edit')) {
                showLoadingAlert();
                const diagnose = await get_diagnos_by_id(p_id);

                if (diagnose.Id_diagnoz) {

                    const back_btn = document.getElementById('back_btn');

                    back_btn.onclick = async (e) => {

                        showLoadingAlert();
                        const p_id = sessionStorage.getItem('p_id');
                        const patient = await get_patient_by_id(p_id);
                        main_page_header.innerHTML = `Bemorlar`;

                        if (patient.Id) {
                            renderDiagnose(patient)
                        };
                        //patients_button.click();
                    };



                    main_page_header.innerHTML = `Diagnozlar`;

                    modal_container.innerHTML = "";


                    card_body.innerHTML =
                        `
                    <div class="row">
                        <div class="col-md-3">
                            
                            <div class="form-group">
                                <label for="d_diagnose_name">Diagnoz</label>
                                <input type="text" class="form-control" id="d_diagnose_name" placeholder="Diagnoz">
                            </div>
                            <div class="form-group">
                                <label for="d_date">Sana</label>
                                <input type="date" class="form-control" id="d_date">
                            </div>
                            <div class="form-group">
                                <label for="d_comment">Komment</label>
                                <textarea id="d_comment" class="form-control" rows="10" placeholder="Enter ..."></textarea>
                            </div>  
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="d_diagnose_info">Tavfsiya</label>
                                <textarea id="d_diagnose_info" class="form-control" rows="22" placeholder="Enter ..."></textarea>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group" id="recipe_table_container">
                                <label for="d_reciepe_name">Retsept</label>
                                <textarea id="d_diagnose_info" class="form-control" rows="11" placeholder="Enter ..."></textarea>
                            </div>
                        </div>
                    </div>               
                    `;


                    card_footer.innerHTML =
                        `
                    <button id="save_btn" type="button" class="btn btn-success float-right">
                        <i class="fas fa-save"></i> Saqlash
                    </button>
                    `;




                    const recipes = await get_recipe_all();

                    const recipe_table_container = document.getElementById('recipe_table_container');

                    recipe_table_container.innerHTML = "";
                    recipe_table_container.innerHTML = `
                    <label for="d_reciepe_name">Retsept</label>
                    <table id="recipes_name_datatable" class="table table-sm table-bordered table-striped table-hover table-head-fixed text-center">
                        <thead>
                            <tr>
                            
                            <th>Retsept</th>
                            <th style="Width:100px"></th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    `;

                    const tbody = recipe_table_container.getElementsByTagName('table')[0].children[1];

                    recipes.forEach(recipe => {
                        const tr = document.createElement('tr');

                        //tr.setAttribute("style", "height:5px")

                        tr.innerHTML =
                            `
                        
                        <td>${recipe.name}</td>
                        
                     
                        <td>
                            <button type="button" class="btn btn-info btn-sm dt_icons dt_add" r_id="${recipe.Id}">
                                <i class="fas fa-plus-circle dt_icons dt_add" r_id="${recipe.Id}"></i>
                            </button>
                        </td>
                        `;
                        tbody.appendChild(tr);
                    });


                    const d_diagnose_name = document.getElementById('d_diagnose_name');
                    const d_date = document.getElementById('d_date');
                    const d_diagnose_info = document.getElementById('d_diagnose_info');
                    const d_comment = document.getElementById('d_comment');


                    d_diagnose_name.value = diagnose.diagnoz;
                    d_date.value = diagnose.date;
                    d_diagnose_info.value = diagnose.recommendation;
                    d_comment.value = diagnose.comment;

                    tbody.onclick = async (e) => {
                        if (e.target.classList.contains('dt_add')) {
                            const r_id = e.target.getAttribute('r_id');
                            const reciepe = await get_reciepe_by_id(r_id);

                            if (reciepe.Id) {
                                let txt = d_diagnose_info.value;

                                if (txt == ``) {
                                    txt += `${reciepe.name} - ${reciepe.info}`;
                                } else {
                                    txt += `\n${reciepe.name} - ${reciepe.info}`;
                                }

                                d_diagnose_info.value = txt;
                            };

                        };
                    };

                    const save_btn = document.getElementById('save_btn');

                    save_btn.onclick = () => {

                        const update_data = {
                            "method": "diagnoz_change",
                            "params": {
                                "id": diagnose.Id_diagnoz,

                                "diagnoz": d_diagnose_name.value,
                                "recommendation": d_diagnose_info.value,
                                "comment": d_comment.value,
                                "date": d_date.value
                            }
                        };

                        const checkdata = {

                            "Diagnoz": d_diagnose_name.value,
                            "Sana": d_date.value,
                            "Tavfsiya": d_diagnose_info.value,
                            "Kommentariya": d_comment.value
                        };




                        try {

                            for (const key in checkdata) {
                                if (checkdata.hasOwnProperty(key)) {
                                    if (checkdata[key] == '' || checkdata[key] == null || checkdata[key] == undefined) {
                                        toastr.warning(`<b>${key}</b> kiritilishi zarur!`);
                                        throw new Error();
                                        break;
                                    };
                                };
                            };

                            $('#edit_diagnose_modal').modal('hide');
                            showLoadingAlert();
                            axios({
                                method: 'post',
                                url: `${HOST}/dashboard/v1/`,
                                data: update_data
                            }).then((res) => {

                                if (res.data.status) {
                                    toastr.success(`Ma'lumot o'zgartirildi`);
                                    main_page_header.innerHTML = `Diagnozlar`;
                                    
                                } else {
                                    toastr.error('Xatolik yuz berdi');
                                    main_page_header.innerHTML = `Diagnozlar`;
                                    console.log(res);
                                }
                            }).catch((e) => {
                                toastr.error('Xatolik yuz berdi');
                                main_page_header.innerHTML = `Diagnozlar`;
                                console.log(e);
                            });


                        } catch (error) {

                        };
                    };

                }

                $(function () {
                    $("#recipes_name_datatable").DataTable(
                        {
                            "responsive": true,
                            "lengthChange": true,
                            "autoWidth": false,
                            "order": [[0, 'desc']],
                            "scrollX": true,
                            "scrollY": "300px",
                            "info": false,

                            "language": {
                                "search": "_INPUT_",            // Removes the 'Search' field label
                                "searchPlaceholder": "Search"   // Placeholder for the search box
                            },
                            "search": {
                                "addClass": 'form-control'
                            },
                            "fnDrawCallback": function () {
                                $("input[type='search']").attr("id", "searchBox");
                                $('#dialPlanListTable').css('cssText', "margin-top: 0px !important;");
                                $("select[name='dialPlanListTable_length'], #searchBox").removeClass("input-sm");
                                $('#searchBox').css("width", "100px").focus();
                                $('#dialPlanListTable_filter').removeClass('dataTables_filter');
                            }

                        }
                    );
                });
            } else if (e.target.classList.contains('dt_delete')) {


                const diagnose = await get_diagnos_by_id(p_id);
                const patient = await get_patient_by_id(diagnose.patient);

                main_page_header.innerHTML = `Diagnozlar`;
                if (diagnose.Id_diagnoz && patient.Id) {




                    let text = `------------------------------------------------------------------\n`;
                    text += `                                Diagnoz o'chirilsinmi ?\n`;
                    text += `------------------------------------------------------------------`;

                    text += `\n  Id: ${diagnose.Id_diagnoz}`;
                    text += `\n  Sana: ${diagnose.date}`;
                    text += `\n  Diagnose: ${diagnose.diagnoz}`;
                    text += `\n  Bemor: ${patient.father_name} ${patient.first_name} ${patient.name}`;
                    text += `\n------------------------------------------------------------------`;


                    if (confirm(text)) {
                        showLoadingAlert();
                        axios({
                            method: 'post',
                            url: `${HOST}/dashboard/v1/`,
                            data: {
                                "method": "diagnoz_delete",
                                "params": {
                                    "id": parseInt(diagnose.Id_diagnoz)
                                }
                            }
                        }).then(async (res) => {
                            if (res.data.status) {
                                toastr.success(`Dziagnoz O'chirildi`);
                                main_page_header.innerHTML = `Diagnozlar`;
                                showLoadingAlert();
                                const p_id = sessionStorage.getItem('p_id');
                                const patient = await get_patient_by_id(p_id);
                                main_page_header.innerHTML = `Bemorlar`;

                                if (patient.Id) {
                                    renderDiagnose(patient)
                                };


                            } else {
                                toastr.error('Xatolik yuz berdi');
                                main_page_header.innerHTML = `Diagnozlar`;
                                console.log(res);
                            }
                        }).catch((e) => {
                            toastr.error('Xatolik yuz berdi');
                            main_page_header.innerHTML = `Diagnozlar`;
                            console.log(e);
                        });
                    }
                }
            } else if (e.target.classList.contains('dt_view')) {


                const diagnose = await get_diagnos_by_id(p_id);
                const patient = await get_patient_by_id(diagnose.patient);

                main_page_header.innerHTML = `Diagnozlar`;
                if (diagnose.Id_diagnoz && patient.Id) {
                    diagnose_preview(diagnose, patient)
                }
            };
        }
    };


    function diagnose_preview(diagnose, patient) {

        let recommendations = diagnose.recommendation.split('\n')



        card_body.innerHTML =
            `
        <div class="med-paper" id="full_body">
      <div class="med-paper-main">
        <div class="med-paper-top">
          <img src="./logo.png" alt="logo" />
        </div>
        <div class="address-title">
          <p>
            г.Бухара, ул. Каюм Муртазоев 2/1. Ориентир: Доз-5 (Рубин-Шамс) Тел:
            +998-(95) 420-01-03; наш канал в телеграмме:
            <span>t.me/LORvrachBukhara</span>
          </p>
        </div>
        <h3 class="consolt-title">Оториноларинголог консультацияси</h3>
        <div class="med-data">
          <div class="person-info">
            <h2>
              Беморнинг Ф.И.Ш: <span>${patient.father_name} ${patient.first_name} ${patient.name}</span>
            </h2>
          </div>
          <div class="person-info">
            <h2>Ёши: <span>${patient.age}</span></h2>
          </div>
          <div class="person-info">
            <h2>
              Диагноз:
              <span>${diagnose.diagnoz}</span>
            </h2>
            <!-- <p>2х сторонний ХГСО (мезотимпанит) rgthyjfhdfgdfh jklnbtkjbn rejkb ver vkjer rkjl jfthdrgt</p> -->
          </div>
        </div>
        <div class="med-advice">
          <h2>Тавсия:</h2>
          <div id="r_container">
          
          </div>
          
        </div>
      </div>

      <div class="med-bottom">
        <div class="med-bottom-top">
          <div class="med-doctor">
            <h2>Врач:</h2>
            <div class="med-doctor-data">
              <p>Кодиров Ш.Ш.</p>
              <span>(97) 488-58-00</span>
            </div>
          </div>
          <div class="med-doctor">
            <h2>Дата осмотра:</h2>
            <p>${diagnose.date}</p>
          </div>
        </div>
        <div class="med-doctor-rec">
          <p>
            Тополмаган дориларизни <span>@arzonaptekabot</span> ботидан
            топишингиз мумкин.
          </p>
          <h4>ТЕЗРОК ТУЗАЛИБ КЕТИШИНГИЗНИ ТИЛАБ КОЛАМИЗ!</h4>
        </div>
      </div>
      
    </div>
        `;

        const r_container = document.getElementById('r_container');

        for (let i = 0; i < recommendations.length; i++) {
            const recommendation = recommendations[i];
            if (recommendation == ``) continue;

            const element = document.createElement('span');
            element.innerHTML = `${recommendation};<br>`;
            r_container.appendChild(element)
        };

        card_footer.innerHTML =
            `
        <button id="save_btn" type="button" class="btn btn-success float-right">
            <i class="fas fa-print"></i> Saqlash
        </button>
        `;

        const save_btn = document.getElementById('save_btn');

        save_btn.onclick = () => {
            window.jsPDF = window.jspdf.jsPDF;
            // html2canvas(document.getElementById('full_body')).then(function (canvas) {
            //     // Convert the canvas to a blob
            //     canvas.toBlob(function (blob) {
            //         // Create a temporary anchor element
            //         const link = document.createElement('a');
            //         link.href = URL.createObjectURL(blob);
            //         link.download = 'Nodir aka.png';

            //         // Programmatically click the anchor element to trigger the download
            //         link.click();

            //         // Clean up the temporary anchor element
            //         URL.revokeObjectURL(link.href);
            //         link.remove();
            //     });
            // });

            // html2canvas(document.getElementById('full_body'), {
            //     onrendered: function(canvas) {         
            //         var imgData = canvas.toDataURL(
            //             'image/png');              
            //         var doc = new jsPDF('p', 'mm');
            //         doc.addImage(imgData, 'PNG', 10, 10);
            //         doc.save('sample-file.pdf');
            //     }
            // });

            var doc = new jsPDF();

            // Source HTMLElement or a string containing HTML.
            // var elementHTML = document.getElementById('full_body');

            // doc.fromHTML(elementHTML, 15, 15, {
            //     width: 170
            // });

            // doc.save('converted.pdf');


            // html2pdf(elementHTML);


            var htmlContent = document.getElementById('full_body');



           

            // Convert HTML to pdfMake document definition
            function htmlToPdfMake(html) {
                var docDefinition = {
                    content: []
                };

                // Create a temporary element to parse the HTML content
                var tempElement = document.createElement("div");
                tempElement.innerHTML = html;

                // Process each child node of the temporary element
                Array.from(tempElement.childNodes).forEach(function (node) {
                    var elementDefinition = {};

                    // Handle different HTML node types
                    switch (node.nodeType) {
                        case Node.ELEMENT_NODE:
                            elementDefinition = handleElementNode(node);
                            break;
                        case Node.TEXT_NODE:
                            elementDefinition = handleTextNode(node);
                            break;
                        // Handle other node types as needed (e.g., comments, etc.)
                    }

                    // Add the element definition to the document content
                    if (elementDefinition) {
                        docDefinition.content.push(elementDefinition);
                    }
                });

                return docDefinition;
            }

            // Helper function to handle HTML element nodes
            function handleElementNode(element) {
                var elementDefinition = {};

                // Map HTML tags to pdfMake styles and properties
                switch (element.tagName.toLowerCase()) {
                    case "h1":
                        elementDefinition = {
                            text: element.innerText,
                            style: "header"
                        };
                        break;
                    case "p":
                        elementDefinition = {
                            text: element.innerText,
                            style: "paragraph"
                        };
                        break;
                    // Handle other HTML tags as needed
                }

                return elementDefinition;
            }

            // Helper function to handle HTML text nodes
            function handleTextNode(textNode) {
                return {
                    text: textNode.textContent
                };
            }

            // Convert HTML to pdfMake document definition
            var docDefinition = htmlToPdfMake(htmlContent);

            // Generate the PDF
            pdfMake.createPdf(docDefinition).download("converted.pdf");



        };

    };

};


async function get_diagnos_all_patients() {
    return axios({
        method: 'post',
        url: `${HOST}/dashboard/v1/`,
        data: {
            "method": "patient_view",
            "params": {

            }
        }
    }).then((res) => {
        if (res.data.data.status) {
            return res.data.data.data
        }
    }).catch((e) => {
        toastr.error('Xatolik yuz berdi');
        main_page_header.innerHTML = `Diagnozlar`;
        return e;
    })
};



async function addDiagnose() {


    async function get_reciepe_by_id(id) {
        return axios({
            method: 'post',
            url: `${HOST}/dashboard/v1/`,
            data: {
                "method": "retsep_view",
                "params": {
                    "id": id
                }
            }
        }).then((res) => {

            if (res.data.status) {
                return res.data.data
            }
        }).catch((e) => {
            toastr.error('Xatolik yuz berdi');
            main_page_header.innerHTML = `Diagnozlar`;
            return e;
        })
    }

    const patients = await get_diagnos_all_patients();


    const card_header = document.getElementById('card_header');
    const card_body = document.getElementById('card_body');
    const card_footer = document.getElementById('card_footer');


    card_header.innerHTML =
        `
    <h3 class="card-title">
        <button id="back_btn" type="button" class="btn btn-primary">
            <i class="fas fa-angle-left"></i> Ortga
        </button>
    </h3>
    `;

    card_body.innerHTML =
        `
    <div class="row">
        <div class="col-md-3">    
            <div class="form-group">
                <label for="d_diagnose_name">Diagnoz</label>
                <input type="text" class="form-control" id="d_diagnose_name" placeholder="Diagnoz">
            </div>
            <div class="form-group">
                <label for="d_date">Sana</label>
                <input type="date" class="form-control" id="d_date">
            </div>
            <div class="form-group">
                <label for="d_comment">Komment</label>
                <textarea id="d_comment" class="form-control" rows="10" placeholder="Enter ..."></textarea>
            </div>  
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="d_diagnose_info">Tavfsiya</label>
                <textarea id="d_diagnose_info" class="form-control" rows="22" placeholder="Enter ..."></textarea>
            </div>
        </div>
        <div class="col-md-3">
            <div class="form-group" id="recipe_table_container">
                <label for="d_reciepe_name">Retsept</label>
                <textarea id="d_diagnose_info" class="form-control" rows="11" placeholder="Enter ..."></textarea>
            </div>
        </div>         
    </div>                               
    `;


    card_footer.innerHTML =
        `
    <button id="save_btn" type="button" class="btn btn-success float-right">
        <i class="fas fa-save"></i> Saqlash
    </button>
    `;

    const d_diagnose_name = document.getElementById('d_diagnose_name');
    const d_date = document.getElementById('d_date');
    const d_diagnose_info = document.getElementById('d_diagnose_info');
    const d_comment = document.getElementById('d_comment');


    const recipes = await get_recipe_all();

    const recipe_table_container = document.getElementById('recipe_table_container');

    recipe_table_container.innerHTML = "";
    recipe_table_container.innerHTML =
        `
    <label for="recipes_name_datatable">Retsept</label>
    <table id="recipes_name_datatable" class="table table-sm table-bordered table-striped table-hover table-head-fixed text-center">
        <thead>
            <tr>       
                <th>Retsept</th>
                <th style="Width:100px"></th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>                                
                    `;

    const tbody = recipe_table_container.getElementsByTagName('table')[0].children[1];

    recipes.forEach(recipe => {
        const tr = document.createElement('tr');

        //tr.setAttribute("style", "height:5px")

        tr.innerHTML =
            `
                        
            <td>${recipe.name}</td>
                        
            <td>
                <button type="button" class="btn btn-info btn-sm dt_icons dt_add" r_id="${recipe.Id}">
                    <i class="fas fa-plus-circle dt_icons dt_add" r_id="${recipe.Id}"></i>
                </button>
            </td>         
            `;
        tbody.appendChild(tr);
    });


    tbody.onclick = async (e) => {
        if (e.target.classList.contains('dt_add')) {
            const r_id = e.target.getAttribute('r_id');
            const reciepe = await get_reciepe_by_id(r_id);

            if (reciepe.Id) {
                let txt = d_diagnose_info.value;

                if (txt == ``) {
                    txt += `${reciepe.name} - ${reciepe.info}`;
                } else {
                    txt += `\n${reciepe.name} - ${reciepe.info}`;
                };

                d_diagnose_info.value = txt;

            };

        };
    };

    $(function () {
        $("#recipes_name_datatable").DataTable(
            {
                "responsive": true,
                "lengthChange": true,
                "autoWidth": false,
                "order": [[0, 'desc']],
                "scrollX": true,
                "scrollY": "300px",
                "info": false,

                "language": {
                    "search": "_INPUT_",            // Removes the 'Search' field label
                    "searchPlaceholder": "Search"   // Placeholder for the search box
                },
                "search": {
                    "addClass": 'form-control'
                },
                "fnDrawCallback": function () {
                    $("input[type='search']").attr("id", "searchBox");
                    $('#dialPlanListTable').css('cssText', "margin-top: 0px !important;");
                    $("select[name='dialPlanListTable_length'], #searchBox").removeClass("input-sm");
                    $('#searchBox').css("width", "100px").focus();
                    $('#dialPlanListTable_filter').removeClass('dataTables_filter');
                }

            }
        );
    });



    const save_btn = document.getElementById('save_btn');

    save_btn.onclick = () => {

        const p_id = sessionStorage.getItem('p_id');

        const create_data = {
            "method": "diagnoz_add",
            "params": {
                "patient": p_id,
                "diagnoz": d_diagnose_name.value,
                "recommendation": d_diagnose_info.value,
                "comment": d_comment.value,
                "date": d_date.value
            }
        };

        const checkdata = {

            "Diagnoz": d_diagnose_name.value,
            "Sana": d_date.value,
            "Tavfsiya": d_diagnose_info.value,
            "Kommentariya": d_comment.value
        };




        try {

            for (const key in checkdata) {
                if (checkdata.hasOwnProperty(key)) {
                    if (checkdata[key] == '' || checkdata[key] == null || checkdata[key] == undefined) {
                        toastr.warning(`<b>${key}</b> kiritilishi zarur!`);
                        throw new Error();
                        break;
                    };
                };
            };

            $('#edit_diagnose_modal').modal('hide');
            showLoadingAlert();
            axios({
                method: 'post',
                url: `${HOST}/dashboard/v1/`,
                data: create_data
            }).then((res) => {

                if (res.data.status) {
                    toastr.success(`Ma'lumot Qo'shildi`);
                    main_page_header.innerHTML = `Diagnozlar`;
                    back_btn.click();
                } else {
                    toastr.error('Xatolik yuz berdi');
                    main_page_header.innerHTML = `Diagnozlar`;
                    console.log(res);
                }
            }).catch((e) => {
                toastr.error('Xatolik yuz berdi');
                main_page_header.innerHTML = `Diagnozlar`;
                console.log(e.response.data);
            });


        } catch (error) {

        };
    };


    const back_btn = document.getElementById('back_btn');

    back_btn.onclick = async (e) => {

        showLoadingAlert();
        const p_id = sessionStorage.getItem('p_id');
        const patient = await get_patient_by_id(p_id);
        main_page_header.innerHTML = `Bemorlar`;

        if (patient.Id) {
            renderDiagnose(patient)
        };
        //patients_button.click();
    };
};




function renderPatiens(data) {

    sessionStorage.setItem('steep', `pations`);


    main_page_header.innerHTML = `Bemorlar`;
    title.innerHTML = `Bemorlar`;

    main_page.innerHTML =
        `
        <div class="card card-outline card-info">
        <div class="card-header">
            <h3 class="card-title">Bemorlar ro'yxati</h3>
        </div>
        <div class="card-body" id="card_body">
                Start creating your amazing application!
        </div>
        <!-- /.card-body -->
        <div class="card-footer">
          
        </div>
        <!-- /.card-footer-->
      </div>
    `;

    const card_body = document.getElementById('card_body');

    card_body.innerHTML =
        `
    <table id="users_datatable" class="table table-sm table-bordered table-striped table-hover table-head-fixed text-center">
        <thead>
            <tr>
              <th>ID</th>
              <th>Ism</th>
              <th>Familiya</th>
              <th>Sharif</th>
              <th>Tug'ilgan sana</th>
              <th>Telefon</th>
              <th></th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    `;

    const tbody = main_page.getElementsByTagName('table')[0].children[1];

    data.forEach(patient => {

        const tr = document.createElement('tr');

        const birth_date = patient.age.split('-');

        let phone = patient.phone;
        if (patient.phone == null || patient.phone == '') phone = '-';

        tr.innerHTML =
            `
        <td>${patient.Id}</td>
        <td>${patient.first_name}</td>
        <td>${patient.father_name}</td>
        <td>${patient.name}</td>
        <td>${patient.age}</td>
        
        <td>${phone}</td>
        <td>
            <button type="button" class="btn btn-danger btn-sm dt_icons dt_delete" p_id="${patient.Id}">
                <i class="fas fa-trash-alt dt_icons dt_delete" p_id="${patient.Id}"></i>
            </button>&nbsp;
            <button type="button" class="btn btn-warning btn-sm dt_icons dt_edit" p_id="${patient.Id}">
                <i class="fas fa-edit dt_icons dt_edit" p_id="${patient.Id}"></i>
            </button>&nbsp;
            <button type="button" class="btn btn-success btn-sm dt_icons dt_diagnose" p_id="${patient.Id}">
                <i class="fas fa-notes-medical dt_icons dt_diagnose" p_id="${patient.Id}"></i>
            </button>
        </td>
        `;
        tbody.appendChild(tr);
    });

    async function get_patient_by_id(id) {
        return axios({
            method: 'post',
            url: `${HOST}/dashboard/v1/`,
            data: {
                "method": "patient_view",
                "params": {
                    "id": id
                }
            }
        }).then((res) => {

            if (res.data.data.status) {
                return res.data.data.data
            }
        }).catch((e) => {
            toastr.error('Xatolik yuz berdi');
            main_page_header.innerHTML = `Bemorlar`;
            return e;
        })
    }

    tbody.onclick = async (e) => {
        if (e.target.classList.contains('dt_icons')) {
            const p_id = e.target.getAttribute('p_id');

            sessionStorage.setItem('p_id', `${p_id}`);

            if (e.target.classList.contains('dt_edit')) {
                showLoadingAlert();
                const patient = await get_patient_by_id(p_id);
                main_page_header.innerHTML = `Bemorlar`;
                if (patient.Id) {

                    modal_container.innerHTML = "";
                    modal_container.innerHTML =
                        `
                    <div class="modal  fade" id="edit_patient_modal" style="display: none;" aria-hidden="true">
                        <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h4 class="modal-title">Bemor ma'lumotlari</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            </div>
                            <div class="modal-body">
                            <div class="row">
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <label for="p_fname">Ism</label>
                                        <input type="text" class="form-control form-control-sm" id="p_fname">
                                    </div>
                                    <div class="form-group">
                                        <label for="p_lname">Familiya</label>
                                        <input type="text" class="form-control form-control-sm" id="p_lname">
                                    </div>
                                    <div class="form-group">
                                        <label for="p_sname">Sharif</label>
                                        <input type="text" class="form-control form-control-sm" id="p_sname">
                                    </div>
                                    <div class="form-group">
                                        <label for="p_id">id</label>
                                        <input type="text" class="form-control form-control-sm" id="p_id" disabled>
                                    </div>
                                </div>
                                <div class="col-md-7">
                                <div class="form-group">
                                    <label for="p_phone">Telefon</label>
                                    <input type="text" class="form-control form-control-sm" id="p_phone">
                                </div>
                                <div class="form-group">
                                    <label for="p_age">Tug'ilgan sana</label>
                                    <input type="date" class="form-control form-control-sm" id="p_age">
                                </div>
                                <div class="form-group">
                                    <label for="p_comment">Kommentariya</label>
                                    <textarea id="p_comment" class="form-control" rows="11" placeholder="Enter ..."></textarea>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div class="modal-footer justify-content-between">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Yopish</button>
                            <button type="button" id="edit_patient_save_btn" class="btn btn-primary">Saqlash</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    `;

                    const p_fname = document.getElementById('p_fname');
                    const p_lname = document.getElementById('p_lname');
                    const p_sname = document.getElementById('p_sname');
                    const p_id = document.getElementById('p_id');
                    const p_phone = document.getElementById('p_phone');
                    const p_age = document.getElementById('p_age');
                    const p_comment = document.getElementById('p_comment');


                    p_fname.value = patient.first_name;
                    p_lname.value = patient.father_name;
                    p_sname.value = patient.name;
                    p_id.value = patient.Id;
                    p_phone.value = patient.phone;
                    p_age.value = patient.age;
                    p_comment.value = patient.comment;

                    $('#edit_patient_modal').modal('show');


                    const edit_patient_save_btn = document.getElementById('edit_patient_save_btn');

                    edit_patient_save_btn.onclick = () => {

                        const update_data = {
                            "method": "patient_change",
                            "params": {
                                "id": parseInt(patient.Id),
                                "first_name": p_fname.value,
                                "father_name": p_lname.value,
                                "age": p_age.value,
                                "phone": p_phone.value,
                                "comment": p_comment.value,
                                "name": p_sname.value

                            }
                        };


                        const checkdata = {
                            "Ism": p_fname.value,
                            "Familiya": p_lname.value,
                            "Sharif": p_sname.value,
                            "Tug'ilgan sana": p_age.value,
                            "Telefon": p_phone.value,
                            "Kommentariya": p_comment.value
                        };




                        try {

                            for (const key in checkdata) {
                                if (checkdata.hasOwnProperty(key)) {
                                    if (checkdata[key] == '' || checkdata[key] == null || checkdata[key] == undefined) {
                                        toastr.warning(`<b>${key}</b> kiritilishi zarur!`);
                                        throw new Error();
                                        break;
                                    };
                                };
                            };

                            $('#edit_patient_modal').modal('hide');
                            showLoadingAlert();
                            axios({
                                method: 'post',
                                url: `${HOST}/dashboard/v1/`,
                                data: update_data
                            }).then((res) => {

                                if (res.data.status) {
                                    toastr.success(`Ma'lumot o'zgartirildi`);
                                    main_page_header.innerHTML = `Bemorlar`;
                                    patients_button.click();
                                } else {
                                    toastr.error('Xatolik yuz berdi');
                                    main_page_header.innerHTML = `Bemorlar`;
                                    console.log(res);
                                }
                            }).catch((e) => {
                                toastr.error('Xatolik yuz berdi');
                                main_page_header.innerHTML = `Bemorlar`;
                                console.log(e.response.data);
                            });


                        } catch (error) {

                        };
                    };

                };
            } else if (e.target.classList.contains('dt_delete')) {


                const patient = await get_patient_by_id(p_id);
                main_page_header.innerHTML = `Bemorlar`;
                if (patient.Id) {


                    let text = `------------------------------------------------------------------\n`;
                    text += `                                Bemor o'chirilsinmi ?\n`;
                    text += `------------------------------------------------------------------`;

                    text += `\n  Ism: ${patient.first_name}`;
                    text += `\n  Familiya: ${patient.father_name}`;
                    text += `\n  Sharifi: ${patient.name}`;
                    text += `\n  Tug'ilgan sana: ${patient.age}`;
                    text += `\n  Telefon: ${patient.phone}`;
                    text += `\n------------------------------------------------------------------`;


                    if (confirm(text)) {
                        showLoadingAlert();
                        axios({
                            method: 'post',
                            url: `${HOST}/dashboard/v1/`,
                            data: {
                                "method": "patient_delete",
                                "params": {
                                    "id": parseInt(patient.Id)
                                }
                            }
                        }).then((res) => {
                            if (res.data.status) {
                                toastr.success(`Bemor O'chirildi`);
                                main_page_header.innerHTML = `Bemorlar`;
                                patients_button.click();
                            } else {
                                toastr.error('Xatolik yuz berdi');
                                main_page_header.innerHTML = `Bemorlar`;
                                console.log(res);
                            }
                        }).catch((e) => {
                            toastr.error('Xatolik yuz berdi');
                            main_page_header.innerHTML = `Bemorlar`;
                            console.log(e);
                        });
                    }
                }
            } else if (e.target.classList.contains('dt_diagnose')) {




                showLoadingAlert();
                const patient = await get_patient_by_id(p_id);
                main_page_header.innerHTML = `Bemorlar`;

                if (patient.Id) {
                    renderDiagnose(patient)
                };
            }


        };
    };


    $(function () {
        $("#users_datatable").DataTable(
            {
                "responsive": true,
                "lengthChange": true,
                "autoWidth": false,
                "order": [[0, 'desc']],
                "buttons": [
                    {
                        text: `<i  class="fas fa-user-plus"></i> Bemor qo'shish`,
                        action: addPatient
                    }],
                "initComplete": function () {
                    //this.api().page(1).draw('page');
                    //console.log(this.api())

                    usersDataTableAPI = this.api();
                }
            }
        ).buttons().container().appendTo('#main_page .col-md-6:eq(0)');
    });


    $('#users_datatable').on('page.dt', function () {

        sessionStorage.setItem('main_users_dt_page', `${usersDataTableAPI.page.info().page}`)
    });

    function addPatient() {
        modal_container.innerHTML = "";
        modal_container.innerHTML =
            `
        <div class="modal  fade" id="add_patient_modal" style="display: none;" aria-hidden="true">
            <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                <h4 class="modal-title">Bemor qo'shish</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                </div>
                <div class="modal-body">
                <div class="row">
                    <div class="col-md-5">
                        <div class="form-group">
                            <label for="p_fname">Ism</label>
                            <input type="text" class="form-control form-control-sm" id="p_fname">
                        </div>
                        <div class="form-group">
                            <label for="p_lname">Familiya</label>
                            <input type="text" class="form-control form-control-sm" id="p_lname">
                        </div>
                        <div class="form-group">
                            <label for="p_sname">Sharif</label>
                            <input type="text" class="form-control form-control-sm" id="p_sname">
                        </div>
                        <div class="form-group">
                            <label for="p_phone">Telefon</label>
                            <input type="text" class="form-control form-control-sm" id="p_phone">
                        </div>
                        <div class="form-group">
                            <label for="p_age">Tug'ilgan sana</label>
                            <input type="date" class="form-control form-control-sm" id="p_age">
                        </div>
                    </div>
                    <div class="col-md-7">
                        <div class="form-group">
                            <label for="p_comment">Kommentariya</label>
                            <textarea id="p_comment" class="form-control" rows="15" placeholder="Enter ..."></textarea>
                        </div>
                    </div>
                </div>
                </div>
                <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-default" data-dismiss="modal">Yopish</button>
                <button type="button" id="add_patient_save_btn" class="btn btn-primary">Saqlash</button>
                </div>
            </div>
            </div>
        </div>
        `;

        $('#add_patient_modal').modal('show');

        const add_patient_save_btn = document.getElementById('add_patient_save_btn');

        add_patient_save_btn.onclick = () => {
            const p_fname = document.getElementById('p_fname');
            const p_lname = document.getElementById('p_lname');
            const p_sname = document.getElementById('p_sname');
            const p_phone = document.getElementById('p_phone');
            const p_age = document.getElementById('p_age');
            const p_comment = document.getElementById('p_comment');

            const create_data = {
                "method": "patient_add",
                "params": {
                    "first_name": p_fname.value,
                    "father_name": p_lname.value,
                    "age": p_age.value,
                    "phone": p_phone.value,
                    "comment": p_comment.value,
                    "name": p_sname.value

                }
            };

            const checkdata = {
                "Ism": p_fname.value,
                "Familiya": p_lname.value,
                "Sharif": p_sname.value,
                "Tug'ilgan sana": p_age.value,
                "Telefon": p_phone.value,
                "Kommentariya": p_comment.value
            };



            try {
                for (const key in checkdata) {
                    if (checkdata.hasOwnProperty(key)) {
                        if (checkdata[key] == '' || checkdata[key] == null || checkdata[key] == undefined) {
                            toastr.warning(`<b>${key}</b> kiritilishi zarur!`);
                            throw new Error();
                            break;
                        };
                    };
                };


                $('#add_patient_modal').modal('hide');
                showLoadingAlert();
                axios({
                    method: 'post',
                    url: `${HOST}/dashboard/v1/`,
                    data: create_data
                }).then((res) => {
                    if (res.data.status) {
                        toastr.success(`Bemor qo'shildi`);
                        main_page_header.innerHTML = `Bemorlar`;
                        patients_button.click();
                    };
                }).catch((e) => {
                    toastr.error('Xatolik yuz berdi');
                    main_page_header.innerHTML = `Bemorlar`;
                    console.log(e);
                });

            } catch (error) {

            }




        };
    };

};



