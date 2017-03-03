import React from 'react';
import styles from './googlemap.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class GoogleMap extends React.Component {
  state = { zoom: 12 };

  static propTypes() {
  	React.PropTypes.objectOf(React.PropTypes.number).isRequired;
  }

  componentDidMount() {
    // create the map, marker and infoWindow after the component has
    // been rendered because we need to manipulate the DOM for Google =(
    this.map = this.createMap();
    this.marker = this.createMarker();
    // this.infoWindow = this.createInfoWindow()

    // have to define google maps event listeners here too
    // because we can't add listeners on the map until its created
    google.maps.event.addListener(this.map, 'zoom_changed', () => this.handleZoomChange());
  }

  // clean up event listeners when component unmounts
  componentDidUnMount() {
    google.maps.event.clearListeners(map, 'zoom_changed');
  }

  createMap() {
    const mapOptions = {
      zoom: this.state.zoom,
      center: this.mapCenter(),
      styles: [
        {
          featureType: 'landscape',
          elementType: 'labels',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'transit',
          elementType: 'labels',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'water',
          elementType: 'labels',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'road',
          elementType: 'labels.icon',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          stylers: [
            {
              hue: '#00aaff',
            },
            {
              saturation: -100,
            },
            {
              gamma: 2.15,
            },
            {
              lightness: 12,
            },
          ],
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [
            {
              visibility: 'on',
            },
            {
              lightness: 24,
            },
          ],
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [
            {
              lightness: 57,
            },
          ],
        },
      ],
    };
    return new google.maps.Map(this.refs.mapCanvas, mapOptions);
  }

  mapCenter() {
    return new google.maps.LatLng(
      this.props.initialCenter.lat,
      this.props.initialCenter.lng,
    );
  }

  createMarker() {
    return new google.maps.Marker({
      position: this.mapCenter(),
      map: this.map,
    });
  }

  // createInfoWindow() {
  //   let contentString = "<div class='InfoWindow'>We are here!</div>"
  //   return new google.maps.InfoWindow({
  //     map: this.map,
  //     anchor: this.marker,
  //     content: contentString
  //   })
  // }

  handleZoomChange() {
    this.setState({
      zoom: this.map.getZoom(),
    });
  }

  render() {
    return (<div className={styles.GMap}>
      <div className={styles.GMapcanvas} ref="mapCanvas" />
    </div>);
  }
}


export default withStyles(styles)(GoogleMap);
