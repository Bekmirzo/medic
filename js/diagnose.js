diagnose_button.onclick = () => {
    showLoadingAlert();
    axios({
        method: 'post',
        url: `${HOST}/dashboard/v1/`,
        data: {
            "method": "diagnoz_view",
            "params": {

            }
        }
    }).then((res) => {

        if (res.data.status) {
            renderDiagnose(res.data.data)
        } else {
            toastr.error('Xatolik yuz berdi');
            main_page_header.innerHTML = `Diagnozlar`;
            console.log(res)
        }
    }).catch((e) => {
        toastr.error('Xatolik yuz berdi');
        main_page_header.innerHTML = `Diagnozlar`;
        console.log(e)
    });

};





async function renderDiagnose(data) {


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
            main_page_header.innerHTML = `Diagnozlar`;
            return e;
        })
    };


    


    main_page_header.innerHTML = `Diagnozlar`;
    title.innerHTML = `Diagnozlar`;

    main_page.innerHTML =
        `
            <div class="card card-outline card-info">
                <div class="card-header">
                    <h3 class="card-title">Diagnozlar ro'yxati</h3>
                   
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
    <table id="diagnose_datable" class="table table-sm table-bordered table-striped table-hover table-head-fixed text-center">
        <thead>
            <tr>
              <th style="Width:100px">ID</th>
              <th>Bemor</th>
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
            <td>${patient.father_name} ${patient.first_name} ${patient.name}</td>
            <td>${diagnoz.diagnoz}</td>
            <td>${diagnoz.date}</td>
    
            <td>
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

    tbody.onclick = async (e) => {

        if (e.target.classList.contains('dt_icons')) {
            const p_id = e.target.getAttribute('p_id');
            if (e.target.classList.contains('dt_edit')) {
                showLoadingAlert();
                const diagnose = await get_diagnos_by_id(p_id);


                if (diagnose.Id_diagnoz) {
                    main_page_header.innerHTML = `Diagnozlar`;

                    modal_container.innerHTML = "";
                    modal_container.innerHTML =
                        `
                    <div class="modal  fade" id="edit_diagnose_modal" style="display: none;" aria-hidden="true">
                        <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h4 class="modal-title">Diagnos qo'shish</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label for="patient_select">Bemor</label>
                                            <select class="form-control select2" id="patient_select">
                                            </select>
                                        </div>
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
                                        <div class="form-group">
                                            <label for="d_reciepe_info">Ma'lumot</label>
                                            <textarea id="d_diagnose_info" class="form-control" rows="8" placeholder="Enter ..."></textarea>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            <div class="modal-footer justify-content-between">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Yopish</button>
                                <button type="button" id="edit_diagnose_save_btn" class="btn btn-primary">Saqlash</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    `;

                    const patients = await get_diagnos_all_patients();

                    const patient_select = document.getElementById('patient_select');
                    patient_select.innerHTML = "";

                    patients.forEach(patient => {
                        const element = document.createElement('option');

                        element.setAttribute('value', patient.Id);
                        element.innerHTML = `${patient.father_name} ${patient.first_name} ${patient.name}`;

                        patient_select.appendChild(element)
                    });

                    $(document).ready(function () {
                        $('.select2').select2();
                        $('.select2bs4').select2({
                            theme: 'bootstrap4'
                        })
                    });


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

                        tr.setAttribute("style", "height:5px")

                        tr.innerHTML =
                            `
                        
                        <td>${recipe.name}</td>
                        
                     
                        <td>
                            <button type="button" class="btn btn-danger btn-sm dt_icons dt_delete" p_id="${recipe.Id}">
                                <i class="fas fa-trash-alt dt_icons dt_delete" p_id="${recipe.Id}"></i>
                            </button>&nbsp;
                            <button type="button" class="btn btn-warning btn-sm dt_icons dt_edit" p_id="${recipe.Id}">
                                <i class="fas fa-edit dt_icons dt_edit" p_id="${recipe.Id}"></i>
                            </button>
                        </td>
                        `;
                        tbody.appendChild(tr);
                    });

                    $(function () {
                        $("#recipes_name_datatable").DataTable(
                            {
                                "responsive": true,
                                "lengthChange": true,
                                "autoWidth": false,
                                "order": [[0, 'desc']],
                                "lengthMenu": [ 5, 10],
                                "pagingType": "simple"
                                
                            }
                        );
                    });


                    const d_diagnose_name = document.getElementById('d_diagnose_name');
                    const d_date = document.getElementById('d_date');
                    const d_diagnose_info = document.getElementById('d_diagnose_info');
                    const d_comment = document.getElementById('d_comment');



                    patient_select.value = diagnose.patient;
                    d_diagnose_name.value = diagnose.diagnoz;
                    d_date.value = diagnose.date;
                    d_diagnose_info.value = diagnose.recommendation;
                    d_comment.value = diagnose.comment;

                    $('#edit_diagnose_modal').modal('show');


                    const edit_diagnose_save_btn = document.getElementById('edit_diagnose_save_btn');

                    edit_diagnose_save_btn.onclick = () => {

                        const update_data = {
                            "method": "diagnoz_change",
                            "params": {
                                "id": diagnose.Id_diagnoz,
                                "patient": patient_select.value,
                                "diagnoz": d_diagnose_name.value,
                                "recommendation": d_diagnose_info.value,
                                "comment": d_comment.value,
                                "date": d_date.value
                            }
                        };

                        const checkdata = {
                            "Bemor": patient_select.value,
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
                                    diagnose_button.click();
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

                };
            } else if (e.target.classList.contains('dt_delete')) {


                const retsep = await get_diagnos_by_id(p_id);
                main_page_header.innerHTML = `Diagnozlar`;
                if (retsep.Id) {

                    const patient = await get_patient_by_id(diagnoz.Id_diagnoz)

                    let text = `------------------------------------------------------------------\n`;
                    text += `                                Diagnoz o'chirilsinmi ?\n`;
                    text += `------------------------------------------------------------------`;

                    text += `\n  Id: ${diagnose.Id_diagnoz}`;
                    text += `\n  Sana: ${diagnose.name}`;
                    text += `\n  Bemor: ${diagnose.name}`;
                    text += `\n------------------------------------------------------------------`;


                    if (confirm(text)) {
                        showLoadingAlert();
                        axios({
                            method: 'post',
                            url: `${HOST}/dashboard/v1/`,
                            data: {
                                "method": "retsep_delete",
                                "params": {
                                    "id": parseInt(retsep.Id)
                                }
                            }
                        }).then((res) => {
                            console.log(res)
                            if (res.data.status) {
                                toastr.success(`Retsept O'chirildi`);
                                main_page_header.innerHTML = `Diagnozlar`;
                                diagnose_button.click();
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
            };
        };
    };


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

        const patients = await get_diagnos_all_patients();

        modal_container.innerHTML = "";
        modal_container.innerHTML =
            `
        <div class="modal  fade" id="add_diagnose_modal" style="display: none;" aria-hidden="true">
            <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                <h4 class="modal-title">Diagnos qo'shish</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="patient_select">Bemor</label>
                                <select class="form-control select2" id="patient_select">
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="d_diagnose_name">Diagnoz</label>
                                <input type="text" class="form-control" id="d_diagnose_name" placeholder="Diagnoz">
                            </div>
                            <div class="form-group">
                                <label for="d_date">Sana</label>
                                <input type="date" class="form-control" id="d_date">
                            </div>  
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="d_diagnose_info">Tavfsiya</label>
                                <textarea id="d_diagnose_info" class="form-control" rows="10" placeholder="Enter ..."></textarea>
                            </div>
                        </div>
                        <div class="col-md-4">
                        <div class="form-group">
                            <label for="d_comment">Komment</label>
                            <textarea id="d_comment" class="form-control" rows="10" placeholder="Enter ..."></textarea>
                        </div>
                    </div>
                    </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Yopish</button>
                    <button type="button" id="add_diagnose_save_btn" class="btn btn-primary">Saqlash</button>
                </div>
            </div>
            </div>
        </div>
        `;



        const patient_select = document.getElementById('patient_select');
        patient_select.innerHTML = "";

        patients.forEach(patient => {
            const element = document.createElement('option');

            element.setAttribute('value', patient.Id);
            element.innerHTML = `${patient.father_name} ${patient.first_name} ${patient.name}`;

            patient_select.appendChild(element)
        });

        $(document).ready(function () {
            $('.select2').select2();
            $('.select2bs4').select2({
                theme: 'bootstrap4'
            })
        });

        $('#add_diagnose_modal').modal('show');

        const add_diagnose_save_btn = document.getElementById('add_diagnose_save_btn');

        add_diagnose_save_btn.onclick = () => {
            const patient_select = document.getElementById('patient_select');
            const d_diagnose_name = document.getElementById('d_diagnose_name');
            const d_date = document.getElementById('d_date');
            const d_diagnose_info = document.getElementById('d_diagnose_info');
            const d_comment = document.getElementById('d_comment');

            const create_data = {
                "method": "diagnoz_add",
                "params": {
                    "patient": patient_select.value,
                    "diagnoz": d_diagnose_name.value,
                    "recommendation": d_diagnose_info.value,
                    "comment": d_comment.value,
                    "date": d_date.value
                }
            };

            const checkdata = {
                "Bemor": patient_select.value,
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


                $('#add_diagnose_modal').modal('hide');
                showLoadingAlert();
                axios({
                    method: 'post',
                    url: `${HOST}/dashboard/v1/`,
                    data: create_data
                }).then((res) => {
                    if (res.data.status) {
                        toastr.success(`Diagnoz qo'shildi`);
                        main_page_header.innerHTML = `Diagnozlar`;
                        diagnose_button.click();
                    };
                }).catch((e) => {
                    toastr.error('Xatolik yuz berdi');
                    main_page_header.innerHTML = `Diagnozlar`;
                    console.log(e);
                });

            } catch (error) {

            }




        };
    };

}