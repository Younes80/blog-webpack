import './assets/styles/styles.scss';
import './index.scss';

const url = 'http://localhost:3000/posts';

const articleContainerElement = document.querySelector('.articles-container');

const formatDate = date => {
	return new Date(date).toLocaleDateString('fr-FR', {
		weekday: 'long',
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	});
};

const createArticles = articles => {
	const articlesDom = articles.map(article => {
		// console.log(article);
		const articleDom = document.createElement('div');
		articleDom.classList.add('article');
		articleDom.innerHTML = `
      <img src="${article.img}" alt="profile" />
      <h2>${article.title}</h2>
      <p class="article-author">${article.author} - ${formatDate(
			article.createdAt
		)}</p>
      <p class="article-content">${article.content}</p>
      <div class="article-actions">
        <button class="btn btn-danger" data-id=${article.id} >Supprimer</button>
        <button class="btn btn-primary" data-id=${article.id} >Modifier</button>
      </div>
    `;
		return articleDom;
	});
	articleContainerElement.innerHTML = '';
	articleContainerElement.append(...articlesDom);

	const deleteButtons = articleContainerElement.querySelectorAll('.btn-danger');
	const editButtons = articleContainerElement.querySelectorAll('.btn-primary');

	editButtons.forEach(button => {
		button.addEventListener('click', event => {
			const articleId = event.target.dataset.id;
			window.location.assign(`/form.html?id=${articleId}`);
		});
	});

	deleteButtons.forEach(button => {
		button.addEventListener('click', async event => {
			// console.log(event);
			try {
				const articleId = event.target.dataset.id;
				const response = await fetch(`${url}/${articleId}`, {
					method: 'DELETE',
				});
				await response.json();
				fetchArticle();
			} catch (e) {
				console.log('e : ', e);
			}
		});
	});
};

const fetchArticle = async () => {
	try {
		const response = await fetch(url);
		const articles = await response.json();
		createArticles(articles);
	} catch (e) {
		console.log('e : ', e);
	}
};

fetchArticle();
