import { Component } from 'react';
import AppHeader from "../app-header/app-header";
import SeacrhPanel from "../search-panel/search-panel";
import PostStatusFilter from "../post-status-filter/post-status-filter";
import PostList from "../post-list/post-list";
import PostAddForm from "../post-add-form/post-add-form";

import './app.css'

export default class App extends Component {
	constructor(props) {
		super(props);
		this.maxId = 4;
	}
	state = {
		data: [
			{ label: 'My', important: true, like: false, id: 'qweq' },
			{ label: 'name', important: false, like: false, id: 'dsf' },
			{ label: 'who', important: false, like: false, id: 'hgt' },
		],
		term: '',
		filter: 'all'
	};


	deleteItem = (id) => {
		this.setState(({ data }) => {

			const index = data.findIndex(elem => elem.id === id);
			const newArr = [...data.slice(0, index), ...data.slice(index + 1)];

			return {
				data: newArr
			}
		});
	}

	addItem = (body) => {
		const newItem = {
			label: body,
			important: false,
			id: this.maxId++
		}

		this.setState(({ data }) => {
			const newArr = [...data, newItem];
			return {
				data: newArr
			}
		})
	}

	onToggleImportant = (id) => {
		this.setState(({ data }) => {

			const
				index = data.findIndex(elem => elem.id === id),
				newItem = { ...data[index], important: !data[index].important },
				newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

			return {
				data: newArr
			}
		})
	}


	onToggleLiked = (id) => {
		this.setState(({ data }) => {

			const
				index = data.findIndex(elem => elem.id === id),
				newItem = { ...data[index], like: !data[index].like },
				newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

			return {
				data: newArr
			}
		})
	}

	searchPost = (items, term) => {
		if (term.length === 0) {
			return items
		}

		return items.filter(item => {
			return item.label.indexOf(term) > -1
		})
	}

	onUpdateSearch = term => {
		this.setState({ term })
	}

	filterPosts = (items, filter) => {
		if (filter === 'like') {
			return items.filter(item => item.like)
		} else {
			return items
		}
	}

	onFilterSelect = (filter) => {
		this.setState({ filter })
	}

	render() {

		const
			{ data, term, filter } = this.state,
			liked = data.filter(el => el.like).length,
			allPosts = data.length;

		const visiblePosts = this.filterPosts(this.searchPost(data, term), filter);

		return (
			<div className="app" >
				<AppHeader
					liked={liked}
					allPosts={allPosts} />
				<div className="search-panel d-flex">
					<SeacrhPanel
						onUpdateSearch={this.onUpdateSearch} />
					<PostStatusFilter
						filter={filter}
						onFilterSelect={this.onFilterSelect} />
				</div>
				<PostList
					posts={visiblePosts}
					onDelete={this.deleteItem}
					onToggleImportant={this.onToggleImportant}
					onToggleLiked={this.onToggleLiked} />
				<PostAddForm
					onAdd={this.addItem} />
			</div>

		)
	}

}

