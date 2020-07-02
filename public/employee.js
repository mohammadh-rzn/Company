$(function () {
    $("#datepicker").datepicker({
        autoclose: true,
        todayHighlight: true
    }).datepicker('update', new Date());
});

function add() {
    $(document).ready(function () {
        $('.container').css('display', 'block');
    })
}

function checkedd(id) {
    $(document).ready(function () {
        if (id === 'female') $('#male').prop('checked', false);
        if (id === 'male') $('#female').prop('checked', false);
        if (id === 'manager') $('#employee').prop('checked', false);
        if (id === 'employee') $('#manager').prop('checked', false);
    })
}

function cancel() {
    $(document).ready(function () {
        $('input').val("");
        $('.container').css('display', 'none')
    })
}

function sendAdd() {
    $(document).ready(function () {

        let a = {};
        a.firstName = $('#firstName').val();
        a.lastName = $('#lastName').val();
        a.nationalCode = $('#nationalCode').val();
        a.birthDate = Date.parse($('#ddate').val());
        if ($('#male').prop('checked') === true) a.male = true;
        else a.male = false;
        if ($('#manager').prop('checked') === true) a.manager = true;
        else a.manager = false;
        a.companyId = $('.saver').prop('id');
        console.log(a);
        $.ajax({
            url: 'http://localhost:3000/employee/addEmployee',
            type: 'POST',
            data: a,
            success(data) {
                $('table').replaceWith(data);
            },
            error(data) {
                console.log(data);
            }
        })
    })
    cancel();
}

function del(id) {
    id = id.slice(1);
    $.ajax({
        type: "DELETE",
        url: 'http://localhost:3000/employee/deleteEmployee/' + id,
        success(data) {
            $('table').replaceWith(data)
        },
        error(err) {
            console.log(err);
        }
    })
}
function openC(){
    $(document).ready(function(){
        add();
        $('#apply').css('display', 'block');
        $('.special').css('display', 'none')
    })

}
function openE(id){
    $(document).ready(function(){
        add();
        $('#edit').css('display', 'block');
        $('#apply').css('display', 'none');
        $('.special').prop('id', 'D'+id)
    })

}
function edit(id) {
    id = id.slice(2);
    add();
    let a = {};
    a.firstName = $('#firstName').val();
    a.lastName = $('#lastName').val();
    a.nationalCode = $('#nationalCode').val();
    a.birthDate = Date.parse($('#ddate').val());
    if ($('#male').prop('checked') === true) a.male = true;
    else a.male = false;
    if ($('#manager').prop('checked') === true) a.manager = true;
    else a.manager = false;
    a.companyId = $('.saver').prop('id');
    $.ajax({
        type: "PUT",
        url: "http://localhost:3000/employee/updateEmployee/"+id,
        data: a,
        success(data){
            $('table').replaceWith(data)
        },  
        error(data){
            console.log(data);
        }
    })
    cancel();
}