recipes_button.onclick = () => {
    showLoadingAlert();
    axios({
        method: 'post',
        url: `${HOST}/dashboard/v1/`,
        data: {
            method: "retsep_view",
            params: {

            }
        }
    }).then((res) => {

        if (res.data.status) {
            renderRecipes(res.data.data)
        } else {
            toastr.error('Xatolik yuz berdi');
            main_page_header.innerHTML = `Retseptlar`;
            console.log(res)
        }
    }).catch((e) => {
        toastr.error('Xatolik yuz berdi');
        main_page_header.innerHTML = `Retseptlar`;
        console.log(e)
    });

};

let recipeDataTableAPI = null;

function renderRecipes(data) {

    main_page_header.innerHTML = `Retseptlar`;
    title.innerHTML = `Retseptlar`;

    main_page.innerHTML =
        `
            <div class="card card-outline card-info">
                <div class="card-header">
                    <h3 class="card-title">Retseptlar ro'yxati</h3>
                   
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
    <table id="recipes_datatable" class="table table-sm table-bordered table-striped table-hover table-head-fixed text-center">
        <thead>
            <tr>
              <th style="Width:100px">ID</th>
              <th>Retsept</th>
              <th style="Width:100px"></th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    `;

    const tbody = main_page.getElementsByTagName('table')[0].children[1];

    data.forEach(recipe => {

        const tr = document.createElement('tr');


        tr.innerHTML =
            `
        <td>${recipe.Id}</td>
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
            main_page_header.innerHTML = `Retseptlar`;
            return e;
        })
    }

    tbody.onclick = async (e) => {
        if (e.target.classList.contains('dt_icons')) {
            const p_id = e.target.getAttribute('p_id');
            if (e.target.classList.contains('dt_edit')) {
                showLoadingAlert();
                const retsep = await get_reciepe_by_id(p_id);

                if (retsep.Id) {
                    main_page_header.innerHTML = `Retseptlar`;
                    modal_container.innerHTML = "";
                    modal_container.innerHTML =
                        `
                    <div class="modal  fade" id="edit_recipe_modal" style="display: none;" aria-hidden="true">
                        <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h4 class="modal-title">Bemor qo'shish</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label for="r_name">Nomi</label>
                                    <input type="text" class="form-control form-control-sm" id="r_name">
                                </div>
                                    <div class="form-group">
                                        <label for="r_info">Ma'lumot</label>
                                        <textarea id="r_info" class="form-control" rows="15" placeholder="Enter ..."></textarea>
                                    </div>
                                </div>
                            <div class="modal-footer justify-content-between">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Yopish</button>
                            <button type="button" id="edit_btn" class="btn btn-primary">Saqlash</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    `;

                    const r_name = document.getElementById('r_name');
                    const r_info = document.getElementById('r_info');


                    r_name.value = retsep.name;
                    r_info.value = retsep.info;

                    $('#edit_recipe_modal').modal('show');


                    const edit_btn = document.getElementById('edit_btn');

                    edit_btn.onclick = () => {

                        const update_data = {
                            "method": "retsep_change",
                            "params": {
                                "id": retsep.Id,
                                "name": r_name.value,
                                "info": r_info.value
                            }
                        };

                        const checkdata = {
                            "Nomi": r_name.value,
                            "Ma'lumot": r_info.value
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

                            $('#edit_recipe_modal').modal('hide');
                            showLoadingAlert();
                            axios({
                                method: 'post',
                                url: `${HOST}/dashboard/v1/`,
                                data: update_data
                            }).then((res) => {

                                if (res.data.status) {
                                    toastr.success(`Ma'lumot o'zgartirildi`);
                                    main_page_header.innerHTML = `Retseptlar`;
                                    recipes_button.click();
                                } else {
                                    toastr.error('Xatolik yuz berdi');
                                    main_page_header.innerHTML = `Retseptlar`;
                                    console.log(res);
                                }
                            }).catch((e) => {
                                toastr.error('Xatolik yuz berdi');
                                main_page_header.innerHTML = `Retseptlar`;
                                console.log(e.response.data);
                            });


                        } catch (error) {

                        };
                    };

                };
            } else if (e.target.classList.contains('dt_delete')) {


                const retsep = await get_reciepe_by_id(p_id);
                main_page_header.innerHTML = `Retseptlar`;
                if (retsep.Id) {


                    let text = `------------------------------------------------------------------\n`;
                    text += `                                Retsept o'chirilsinmi ?\n`;
                    text += `------------------------------------------------------------------`;

                    text += `\n  Id: ${retsep.Id}`;
                    text += `\n  nomi: ${retsep.name}`;
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
                                main_page_header.innerHTML = `Retseptlar`;
                                recipes_button.click();
                            } else {
                                toastr.error('Xatolik yuz berdi');
                                main_page_header.innerHTML = `Retseptlar`;
                                console.log(res);
                            }
                        }).catch((e) => {
                            toastr.error('Xatolik yuz berdi');
                            main_page_header.innerHTML = `Retseptlar`;
                            console.log(e);
                        });
                    }
                }
            };
        };
    };

    

    $(function () {
        $("#recipes_datatable").DataTable(
            {
                "responsive": true,
                "lengthChange": true,
                "autoWidth": false,
                "order": [[0, 'desc']],
                "buttons": [
                    {
                        text: `<i  class="fas fa-plus"></i>  Qo'shish`,
                        action: addReciepe
                    }],
                "initComplete": function () {
                    //this.api().page(1).draw('page');
                    //console.log(this.api())

                    recipeDataTableAPI = this.api();
                }

            }
        ).buttons().container().appendTo('#main_page .col-md-6:eq(0)');

        //const table = document.getElementById('recipes_datatable')

        // $( ".paginate_button  [data-dt-idx='10']" ).trigger("click");

        //var table = $('#example').DataTable();

        $('#recipes_datatable').on('page.dt', function () {
            //var info = table.page.info();
            //console.log(table)

            // let a = $('#recipes_datatable').api()


             console.log(recipeDataTableAPI.page.info().page)
        });

    });



    function addReciepe() {
        modal_container.innerHTML = "";
        modal_container.innerHTML =
            `
        <div class="modal  fade" id="add_recipe_modal" style="display: none;" aria-hidden="true">
            <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                <h4 class="modal-title">Bemor qo'shish</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="r_name">Nomi</label>
                        <input type="text" class="form-control form-control-sm" id="r_name">
                    </div>
                        <div class="form-group">
                            <label for="r_info">Ma'lumot</label>
                            <textarea id="r_info" class="form-control" rows="15" placeholder="Enter ..."></textarea>
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

        $('#add_recipe_modal').modal('show');

        const add_patient_save_btn = document.getElementById('add_patient_save_btn');

        add_patient_save_btn.onclick = () => {
            const r_name = document.getElementById('r_name');
            const r_info = document.getElementById('r_info');

            const create_data = {
                "method": "retsep_add",
                "params": {
                    "name": r_name.value,
                    "info": r_info.value
                }
            };

            const checkdata = {
                "Nomi": r_name.value,
                "Ma'lumot": r_info.value
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


                $('#add_recipe_modal').modal('hide');
                showLoadingAlert();
                axios({
                    method: 'post',
                    url: `${HOST}/dashboard/v1/`,
                    data: create_data
                }).then((res) => {
                    if (res.data.status) {
                        toastr.success(`Retsept qo'shildi`);
                        main_page_header.innerHTML = `Retseptlar`;
                        recipes_button.click();
                    };
                }).catch((e) => {
                    toastr.error('Xatolik yuz berdi');
                    main_page_header.innerHTML = `Retseptlar`;
                    console.log(e);
                });

            } catch (error) {

            }




        };
    };

}