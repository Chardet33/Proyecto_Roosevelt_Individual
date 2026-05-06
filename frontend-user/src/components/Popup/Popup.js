import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import mapboxgl from 'mapbox-gl'    

export default function Popup({ mapRef, popupData }) {
  const popupRef = useRef(new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: true,
    anchor: 'bottom',
    offset: [0, -25]
  }))
  const containerRef = useRef(document.createElement('div'))

  useEffect(() => {
    if (!mapRef.current) return // wait for map to initialize

    //remove the popup if there is no selected marker
    if (!popupData) {
      popupRef.current.remove()
      return
    }

    const { lngLat } = popupData

    popupRef.current
      .setLngLat(lngLat)
      .setDOMContent(containerRef.current)
      .addTo(mapRef.current)

    // cleanup function to remove popup on unmount
    return () => popupRef.current.remove()

  }, [mapRef, popupData])

  if (!popupData) return null

  const { properties } = popupData

  return createPortal(
    <div>
      <h3>{properties.name}</h3>
      <p><strong>Cuisine:</strong> {properties.cuisine}</p>
    </div>,
    containerRef.current
  )
}