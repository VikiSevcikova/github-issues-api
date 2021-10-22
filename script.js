const container = document.getElementById("container");
const searchInput = document.getElementById("search");

let searchTerm = '';

searchInput.addEventListener("keyup", (e) => {
	searchTerm = e.target.value.toLowerCase();
	fetchIssues();
})

fetchIssues();

function fetchIssues() {
	fetch('https://api.github.com/repos/testing-library/react-testing-library/issues')
	.then((response) => {if(response.status >=200 && response.status < 300) return response.json()})
	.then((data) => {showIssues(data)})
	.catch(function (err) {
		// There was an error
		console.warn('Something went wrong.', err);
	});
}

function showIssues(data){
	container.innerHTML = '';
	data.filter(d => d.title.toLowerCase().includes(searchTerm))
		.map(d => {
		let {html_url, number, title, user, labels} = d;
		let labelsRow = createLabelsRow(labels);
		container.innerHTML += `
			<div class="box">
				<a class="issue-link" href="${html_url}"></a>
				<div class="row">
					<a href="${user.html_url}">
						<img src="${user.avatar_url}" alt="${user.login}" class="avatar"/>
					</a>
					<b>#${number}</b> ${title}
				</div>
				${labelsRow}
			</div>
		`
	})
}

function createLabelsRow(labels){
	console.log(labels)
	if(!labels || labels.length === 0) return '';
	let labelTags = '';
		labels.map(l => {
			labelTags += `<span class="label" style="background-color:#${l.color};color:${l.default?"black":"white"}">${l.name}</span>`
		})
	let labelsRow = `<div class="row">
						<div class="labels">
							${labelTags}
						</div>
					</div>`;
	return labelsRow;
}