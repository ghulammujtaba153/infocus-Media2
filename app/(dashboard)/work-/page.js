"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FiPlus, FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import WorkModal from "@/components/(dashboard)/WorkModal";
import Notification from "@/components/Notification";
import Loader from "@/components/Loader";

const WorkPage = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWork, setEditingWork] = useState(null);
  const [notification, setNotification] = useState(null);
  const [filter, setFilter] = useState('all');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'video-production', label: 'Video Production' },
    { value: 'motion-graphics', label: 'Motion Graphics' },
    { value: 'social-media', label: 'Social Media' },
    { value: 'animation', label: 'Animation' },
    { value: 'event-coverage', label: 'Event Coverage' },
  ];

  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    try {
      const response = await fetch('/api/work/get-works');
      const result = await response.json();
      
      if (response.ok) {
        setWorks(result.works);
      } else {
        setNotification({
          message: "Failed to fetch works",
          type: "error"
        });
      }
    } catch (error) {
      console.error('Error fetching works:', error);
      setNotification({
        message: "Failed to fetch works",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (workData) => {
    try {
      const url = editingWork ? '/api/work/update' : '/api/work/create';
      const response = await fetch(url, {
        method: editingWork ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workData),
      });

      const result = await response.json();

      if (response.ok) {
        setNotification({
          message: editingWork ? "Work updated successfully!" : "Work created successfully!",
          type: "success"
        });
        fetchWorks();
      } else {
        setNotification({
          message: result.error || "Operation failed",
          type: "error"
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setNotification({
        message: "Operation failed",
        type: "error"
      });
    }
  };

  const handleEdit = (work) => {
    setEditingWork(work);
    setIsModalOpen(true);
  };

  const handleDelete = async (workId) => {
    if (!confirm("Are you sure you want to delete this work?")) return;

    try {
      const response = await fetch(`/api/work/delete/${workId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (response.ok) {
        setNotification({
          message: "Work deleted successfully!",
          type: "success"
        });
        fetchWorks();
      } else {
        setNotification({
          message: result.error || "Failed to delete work",
          type: "error"
        });
      }
    } catch (error) {
      console.error('Error deleting work:', error);
      setNotification({
        message: "Failed to delete work",
        type: "error"
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingWork(null);
  };

  const filteredWorks = works.filter(work => 
    filter === 'all' || work.category === filter
  );

  const formatCategoryName = (category) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Function to get the primary media for display
  const getPrimaryMedia = (work) => {
    // Priority 1: Single video link (video-production, motion-graphics, event-coverage)
    if (work.videoLink) {
      return { type: 'video', url: work.videoLink };
    }
    
    // Priority 2: Multiple video links - show first (animation)
    if (work.videoLinks && work.videoLinks.length > 0) {
      return { type: 'video', url: work.videoLinks[0] };
    }
    
    // Priority 3: Images - show first (social-media)
    if (work.images && work.images.length > 0) {
      return { type: 'image', url: work.images[0] };
    }
    
    return null;
  };

  // Function to get video embed URL for different platforms
  const getVideoEmbedUrl = (url) => {
    if (!url) return null;
    
    // YouTube
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }
    
    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }
    
    // Return original URL for other platforms
    return url;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Work Management</h1>
          <p className="text-gray-600 mt-1">Manage your portfolio work across different categories</p>
        </div>
        <Link href="/work-/add-work">
          <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
            <FiPlus size={18} />
            Add Work
          </button>
        </Link>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <button
              key={category.value}
              onClick={() => setFilter(category.value)}
              className={`px-4 py-2 rounded text-sm transition ${
                filter === category.value
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-blue-600">{works.length}</div>
          <div className="text-sm text-gray-600">Total Works</div>
        </div>
        {categories.slice(1).map(category => {
          const count = works.filter(work => work.category === category.value).length;
          return (
            <div key={category.value} className="bg-white p-4 rounded-lg shadow border">
              <div className="text-2xl font-bold text-gray-800">{count}</div>
              <div className="text-sm text-gray-600">{category.label}</div>
            </div>
          );
        })}
      </div>

      {/* Works Grid */}
      {filteredWorks.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">
            {filter === 'all' ? 'No works found' : `No works found in ${formatCategoryName(filter)}`}
          </div>
    <Link href="/work-/add-work">
            <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">
              Add Your First Work
            </button>
    </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorks.map(work => {
            const primaryMedia = getPrimaryMedia(work);
            
            return (
              <div key={work._id} className="bg-white rounded-lg shadow border overflow-hidden hover:shadow-lg transition">
                <div className="relative">
                  {primaryMedia ? (
                    primaryMedia.type === 'video' ? (
                      <div className="w-full h-48 bg-black">
                        <iframe
                          src={getVideoEmbedUrl(primaryMedia.url)}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={work.title}
                        />
                      </div>
                    ) : (
                      <img
                        src={primaryMedia.url}
                        alt={work.title}
                        className="w-full h-48 object-cover"
                      />
                    )
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No media</span>
                    </div>
                  )}
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${
                    work.status === 'published' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-500 text-white'
                  }`}>
                    {work.status}
                  </div>
                </div>
              
              <div className="p-4">
                <div className="mb-2">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {formatCategoryName(work.category)}
                  </span>
                </div>
                
                <h3 className="font-semibold text-lg mb-1">{work.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{work.client}</p>
                {work.location && (
                  <p className="text-gray-500 text-xs mb-2">📍 {work.location}</p>
                )}
                
                <div className="flex justify-between items-center mt-4 pt-3 border-t">
                  <div className="text-xs text-gray-500">
                    {new Date(work.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(work)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                      title="Edit"
                    >
                      <FiEdit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(work._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                      title="Delete"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      <WorkModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        initialData={editingWork}
        setNotification={setNotification}
      />

      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default WorkPage;