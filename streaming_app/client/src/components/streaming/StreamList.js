import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
    componentDidMount(){
        this.props.fetchStreams();
    }

    renderButtons(stream){
        if(stream.userId === this.props.currentUserId){
            return(
                <div className= "float-right" style={{position:"relative"}}>
                    <Link to={"/stream/edit/"+stream.id} type="button" className="btn btn-primary btn-lg">EDIT</Link>
                    <Link  to={"/stream/delete/"+stream.id} type="button" className="btn btn-danger btn-lg">DELETE</Link>
                </div>
            );
        }
    }

    renderList(){
        return( this.props.streams.map((stream)=>{
            return (
                <div className="list-group-item list-group-item-action" key={stream.id}>
                   {this.renderButtons(stream)}
                    <Link to={"/stream/"+stream.id} className="mb-1">{stream.title}</Link> 
                    <p className="mb-1">{stream.description}</p>
                </div>
            );
        }));
    }

    renderCreate(){
        if(this.props.isSignedIn){
            return(
                <div style ={{textAlign:"right"}}>
                    <Link className="btn btn-primary btn-lg w-25" to="/stream/new">Create</Link>
                </div>
            );
        }
    }

    render(){
        return (
            <div>
                <h2 style={{textAlign:"center"}}>STREAMS</h2>
                <div className="list-group">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div>
        );
    }
};
const mapStateToProps = (state) =>{
    //Object.value convierte un objeto en un arreglo
    return ({
        streams : Object.values(state.streams),
        currentUserId : state.auth.userId,
        isSignedIn : state.auth.isSignedIn
    });
};

export default connect(mapStateToProps, {fetchStreams})(StreamList);