

$(function () {
    $("#datepicker").datepicker({
        autoclose: true,
        todayHighlight: true
    }).datepicker('update', new Date());
});
$(function () {
    $("#DP1").datepicker({
        autoclose: true,
        todayHighlight: true
    }).datepicker('update', new Date());
});

$(function () {
    $("#DP2").datepicker({
        autoclose: true,
        todayHighlight: true
    }).datepicker('update', new Date());
});


function cancel() {
    $(document).ready(function () {
        $('input').val("");
        $('.container').css('display', 'none')
    })
}

function employee(id) {
    window.location.replace("http://localhost:3000/employee/companyEmployees/" + id)
}

function add() {
    $(document).ready(function () {
        $('.container').css('display', 'block');
    })
}

function openC() {
    $(document).ready(function () {
        add();
        $('#apply').css('display', 'block');
        $('.special').css('display', 'none')
    })

}

function openE(id) {
    event.stopPropagation();
    $(document).ready(function () {
        add();
        $('#edit').css('display', 'block');
        $('#apply').css('display', 'none');
        $('.special').prop('id', 'D' + id)
    })
}

function sendAdd() {
    $(document).ready(function () {

        let a = {};
        a.name = $('#name').val();
        a.city = $('#city').val();
        a.state = $('#state').val();
        a.regNumber = $('#regNumber').val();
        a.phoneNumber = $('#phoneNumber').val();
        a.regDate = Date.parse($('#ddate').val());
        console.log(a);
        $.ajax({
            url: 'http://localhost:3000/company/addCompany',
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
    event.stopPropagation();
    id = id.slice(1);
    $.ajax({
        type: "DELETE",
        url: 'http://localhost:3000/company/deleteCompany/' + id,
        success(data) {
            $('table').replaceWith(data)
        },
        error(err) {
            console.log(err);
        }
    })
}

function edit(id) {
    id = id.slice(2);
    let a = {};
    a.name = $('#name').val();
    a.city = $('#city').val();
    a.state = $('#state').val();
    a.regNumber = $('#regNumber').val();
    a.phoneNumber = $('#phoneNumber').val();
    a.regDate = Date.parse($('#ddate').val());
    $.ajax({
        type: "PUT",
        url: "http://localhost:3000/company/updateCompany/" + id,
        data: a,
        success(data) {
            $('table').replaceWith(data)
        },
        error(data) {
            console.log(data);
        }
    })
    cancel();
}
function search(){
    $(document).ready(function(){
        let a = {array:[]};
        console.log($('#from').val(), $('#to').val());
        a.array.push(Date.parse($('#from').val()));
        a.array.push(Date.parse($('#to').val()));
        $.ajax({
            type: "POST",
            url: 'http://localhost:3000/company/between',
            data: a,
            success(data){
                $('table').replaceWith(data);
            },
            error(err){
                console.log(err)
            }
        })
    })

}