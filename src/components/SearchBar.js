import React from 'react';

class SearcBar extends React.Component{

    

    handleFormSubmit = (event) => {
        event.preventDefault();
    }

    render(){
        return (
            <form onSubmit={this.handleFormSubmit}>
                <div className="form-row mb-4 mt-2">
                    <div className="col-12">

                        <input 
                        onChange={this.props.searchMovieProp} 
                        type="text" className="form-control" placeholder="Search a Movie"
                        
                        />
                    </div>
                </div>
            </form>
        )
    }
}

export default SearcBar;