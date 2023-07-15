drugs_button.onclick = () => {
    showLoadingAlert();
    axios({
        method: 'get',
        url: `${HOST}/dashboard/v1/`,
    }).then((res) => {
        if (res.data.ok) {
            renderDrugs(res.data.data)
        }
    }).catch((e) => {
        main_page_header.innerHTML = `Dorilar`;
        console.log(e)
    });

};


function renderDrugs(data) {

    main_page_header.innerHTML = `Dorilar`;
    title.innerHTML = `Dorilar`;

    main_page.innerHTML =
        `
        <div class="card card-outline card-info">
          <div class="card-header">
            <h3 class="card-title">Dorilar ro'yxati</h3>
          </div>
          <!-- /.card-header -->
          <!-- form start -->
          <div class="card-body">
            <div class="row">
              <div class="col-md-5">
                <label for="drug">Dori qo'shish</label>
                <div class="input-group">
                  <input id="add_drug_input" type="text" class="form-control" placeholder="Dori nomini kiriting">
                  <span class="input-group-append" id="drug_add_btn">
                    <button type="button" class="btn btn-success btn-flat">qo'shish</button>
                  </span>
                </div>
              </div>
              <div class="col-md-12" id="card_body">

              </div>
            </div>
          </div>
          <!-- /.card-body -->

          <div class="card-footer">

          </div>

        </div>
    `;

    const card_body = document.getElementById('card_body');


    card_body.innerHTML =
        `<br>
    <table id="drugs_datatable" class="table table-sm table-bordered table-striped table-hover table-head-fixed text-center">
        <thead>
            <tr>
              <th>№</th>
              <th>Dori</th>
              <th></th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    `;
    const add_drug_input = document.getElementById('add_drug_input');

    drug_add_btn.onclick = () => {

        if (add_drug_input.value == '') {
            toastr.warning('Dori nomini kiriting');
        } else {
            showLoadingAlert();
            axios({
                method: 'post',
                url: `${HOST}/dashboard/v1/`,
                data:
                {
                    name: add_drug_input.value
                }
            }).then((res) => {
                if (res.data.ok) {
                    toastr.success(`Dori qo'hildi`);
                    main_page_header.innerHTML = `Dorilar`;
                    drugs_button.click();
                };
            }).catch((e) => {
                main_page_header.innerHTML = `Dorilar`;
                console.log(e.response.data);
            });
        }
    };

    const tbody = main_page.getElementsByTagName('table')[0].children[1];

    data.forEach(drug => {
        const tr = document.createElement('tr');

        tr.innerHTML =
            `
        <td>${drug.id}</td>
        <td>${drug.name}</td>
        <td>
            <button type="button" class="btn btn-danger btn-sm dt_icons dt_delete" d_id="${drug.id}">
                <i class="fas fa-trash-alt dt_icons dt_delete" d_id="${drug.id}"></i>
            </button>&nbsp;
            <button type="button" class="btn btn-warning btn-sm dt_icons dt_edit" d_id="${drug.id}">
                <i class="fas fa-edit dt_icons dt_edit" d_id="${drug.id}"></i>
            </button>
        </td>
        `;
        tbody.appendChild(tr);
    });



    tbody.onclick = async (e) => {
        if (e.target.classList.contains('dt_icons')) {
            const d_id = e.target.getAttribute('d_id');
            const drug = data.find((drug) => drug.id == d_id);

            if (e.target.classList.contains('dt_edit')) {

                main_page_header.innerHTML = `Dorilar`;
                modal_container.innerHTML = "";
                modal_container.innerHTML =
                    `
                    <div class="modal  fade" id="edit_drug_modal" style="display: none;" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h4 class="modal-title">Bemor ma'lumotlari</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label for="d_name">Dori nomini o'zgartirish</label>
                                    <input type="text" class="form-control " id="d_name">
                                </div>
                            </div>
                            <div class="modal-footer justify-content-between">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Yopish</button>
                            <button type="button" id="edit_drug_save_btn" class="btn btn-primary">Saqlash</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    `;

                const d_name = document.getElementById('d_name');
                d_name.value = drug.name;


                $('#edit_drug_modal').modal('show');


                const edit_drug_save_btn = document.getElementById('edit_drug_save_btn');

                edit_drug_save_btn.onclick = () => {


                    if (d_name.value == '') {
                        toastr.warning('Dori nomi kirtilisi shart !')
                    } else {
                        $('#edit_drug_modal').modal('hide');
                        showLoadingAlert();
                        axios({
                            method: 'put',
                            url: `http://localhost:8080/api/v1/drugs/${d_id}`,
                            data: {
                                name: d_name.value
                            }
                        }).then((res) => {
                            if (res.data.ok) {
                                toastr.success(`Ma'lumot o'zgartirildi`);
                                main_page_header.innerHTML = `Dorilar`;
                                drugs_button.click();
                            };
                        }).catch((e) => {
                            toastr.error('Xatolik yuz berdi');
                            main_page_header.innerHTML = `Dorilar`;
                            console.log(e.response.data);
                        });
                    };
                };


            } else if (e.target.classList.contains('dt_delete')) {

                main_page_header.innerHTML = `Dorilar`;




                let text = `------------------------------------------------------------------\n`;
                text += `                                Dori o'chirilsinmi ?\n`;
                text += `------------------------------------------------------------------`;

                text += `\n  Id: ${d_id}`;
                text += `\n  Dori: ${drug.name}`;
                text += `\n------------------------------------------------------------------`;

                if (confirm(text)) {
                    showLoadingAlert();
                    axios({
                        method: 'delete',
                        url: `http://localhost:8080/api/v1/drugs/${d_id}`,
                    }).then((res) => {
                        if (res.data.ok) {
                            toastr.success(`Dori O'chirildi`);
                            main_page_header.innerHTML = `Dorilar`;
                            drugs_button.click();
                        }
                    }).catch((e) => {
                        toastr.error('Xatolik yuz berdi');
                        main_page_header.innerHTML = `Dorilar`;
                        console.log(e)
                    });
                }

            };
        };
    };


    $(function () {
        $("#drugs_datatable").DataTable(
            {
                "responsive": true,
                "lengthChange": true,
                "autoWidth": false,
                "order": [[0, 'desc']],

            }
        ).buttons().container().appendTo('#main_page .col-md-6:eq(0)');
    });




}