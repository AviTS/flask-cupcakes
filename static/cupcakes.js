
function createCupcakeList(cupcake) {
    return `
    <div data_cupcake_id=${cupcake.id}>
    <li>
        ${cupcake.flavor} ${cupcake.size} ${cupcake.rating}
        <button class='delete_button'>
            Delete Cupcake
        </button>
    </li>
    <img class='cupcake_img' src='${cupcake.image}'>
    </div>
    `;
}

async function showCupcakeList() {
    const resp = await axios.get(`http://127.0.0.1:5000/api/cupcakes`);

    for (let cupcakeData of resp.data.cupcakes) {
        let newCupcake = $(createCupcakeList(cupcakeData));
        $('#cupcakes_list').append(newCupcake);
    }
}

$('#new_cupcake_form').on('submit', async function (evt) {
    evt.preventDefault();

    let flavor = $('#form_flavor').val();
    let rating = $('#form_rating').val();
    let size = $('#form_size').val();
    let image = $('#form_image').val();

    const newCupcakeResp = await axios.post(`http://127.0.0.1:5000/api/cupcakes`, {
        flavor,
        rating,
        size,
        image
    });

    let newCupcake = $(createCupcakeList(newCupcakeResp.data.cupcake));
    $("#cupcakes_list").append(newCupcake);
    $("#new_cupcake_form").trigger("reset");
});

$('#cupcakes_list').on('click', '.delete_button', async function (evt) {
    evt.preventDefault();

    let $cupcake = $(evt.target).closest('div');
    let cupcakeId = $cupcake.attr('data_cupcake_id');

    await axios.delete(`http://127.0.0.1:5000/api/cupcakes/${cupcakeId}`);
    $cupcake.remove();
});

$(showCupcakeList);