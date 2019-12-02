import React, { Component } from 'react';
import './App.css';
import axios from 'axios';




class App extends Component {
  state={ 
    loading:true,
    response:{},
    activePage: 1,
    videos: []
  }
  //extracting data from url
  getData=()=>{
    
    axios.get(`https://api.vimeo.com/channels/bestofthemonth/videos?page=`+this.state.activePage,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer 57930b58a1a128c6c01489efd1ab3163'
    }
    })
      .then(res => {    
        this.setState({loading:false})
        this.setState({response:res.data})    
        this.setState({ videos:res.data.data });

      })
  }

  componentDidMount() {
    this.getData()
      
  }
  //build the view from videos variable
  getVideo=()=>{
    const items=[]
    this.state.videos.map(vs => {
      if(vs !=null){
        return(
          items.push(
          <div className="container">
            <img alt="image" className="container__image" src={vs.pictures.sizes[1].link}/>
            <div className="container__text">
              <h2>{vs.name}</h2>
              <p>{vs.description}</p>
              <p className="duration">Duration : {Math.floor(vs.duration/60)}:{vs.duration%60}  & Language :{vs.language? +vs.language:"undefined"} & User: {vs.user.name}</p>
            </div>
          </div>
          )
        )
      }
      else{
        return null;
      }
     
    })
    return items
  }
  //visit the next page
  changePagePlus=()=>{
    this.state.activePage+=1
    if (this.state.activePage<=this.state.response.total){
      this.getData()
    }
    else{
      alert("You can't go further")
    }
    
  }
  //back to the page before 
  changePageMinus=()=>{
    this.state.activePage-=1
    if (this.state.activePage>0){
      this.getData()
    }
    else{
      alert("You can't go further");
      this.setState({activePage:this.state.activePage+=1})
    }
    
  }


  render(){
    this.getVideo();
    
    return (
      <div className="App">
        <div className="pagination">
          <a onClick={this.changePageMinus}>&laquo;</a>
          <a className="active">{this.state.activePage}</a>
          <a onClick={this.changePagePlus}>&raquo;</a>
        </div>
        {this.state.loading?"Loading...":this.getVideo()}
        <div className="pagination">
          <a onClick={this.changePageMinus}>&laquo;</a>
          <a className="active">{this.state.activePage}</a>
          <a onClick={this.changePagePlus}>&raquo;</a>
        </div>
       
      </div>
      
      

    );
  }
  
}

export default App;
