import CommonWrapper from "@/common/CommonWrapper";
import EditServiceModal from "@/components/dashboard/DashboardComponent/DashboardBusinessInfoPageComponent/modal/EditServiceModal";
import DeleteServiceModal from "@/components/dashboard/DashboardComponent/DashboardBusinessInfoPageComponent/modal/DeleteServiceModal";
import {
  Search,
  ChevronDown,
  RefreshCw,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import {
  useGetBusinessesQuery,
  TBusinessService,
} from "@/store/features/business/business.api";
import AddServiceModal from "@/components/dashboard/DashboardComponent/DashboardBusinessInfoPageComponent/modal/AddServiceModal";
import { toast } from "sonner";
import { useDeleteServicesMutation } from "@/store/features/business/business.api";

export default function DashboardBusinessServicesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<TBusinessService | null>(null);
  
  const { data: businesses = [], isLoading } = useGetBusinessesQuery();
  const business = businesses[0];
  const services = business?.services ?? [];
  const [deleteService, { isLoading: isDeleting }] = useDeleteServicesMutation();
  
  const handleEditClick = (service: TBusinessService) => {
    setSelectedService(service);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (service: TBusinessService) => {
    setSelectedService(service);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!business?.id || !selectedService?.id) {
      toast.error("Business or service not found");
      return;
    }

    try {
      await deleteService({
        business_id: business.id,
        id: selectedService.id,
      }).unwrap();

      toast.success("Service deleted successfully");
      setIsDeleteModalOpen(false);
      setSelectedService(null);
    } catch {
      toast.error("Failed to delete service");
    }
  };

  return (
    <div className="">
      <CommonWrapper>
        <div className="">
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-4">
            <h1 className="text-2xl font-semibold text-white tracking-tight">
              Services
            </h1>
            <div className="flex items-center gap-4">
              <button className="text-gray-900 bg-white p-3 rounded-full cursor-pointer hover:text-gray-900 transition-colors">
                <RefreshCw size={15} strokeWidth={1.8} />
              </button>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-1.5 cursor-pointer bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium px-3 py-3 rounded-2xl transition-colors">
                <Plus size={16} strokeWidth={2.2} />
                Add Services
              </button>
            </div>
          </div>

          {/* Search / Filter Bar */}
          <div className="flex items-center gap-3 px-5 ">
            <div className="flex items-center gap-3 pb-2">
              {/* Search */}
              <div className="relative w-64">
                <div className="h-8 w-8 rounded-full bg-[#F2F4F5] absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search
                    size={14}
                    className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-900 "
                  />
                </div>
                <input
                  type="text"
                  placeholder="Search by phone number"
                  className="w-full pl-14 pr-3 py-4 text-sm font-medium bg-[#1E1E1E] rounded-full text-white/50 placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all"
                />
              </div>

              {/* Filter Dropdown */}
              <div className="relative">
                <button className="flex items-center gap-2 px-4 py-4 bg-[#1E1E1E] border border-gray-700 rounded-full text-sm font-medium text-gray-400 hover:border-gray-300 transition-all cursor-pointer">
                  All Calls
                  <ChevronDown size={16} className="text-gray-400 ml-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Service Groups */}
          <div
            className=" rounded-3xl   p-6"
            // style={{
            //   background: `radial-gradient(ellipse 70% 60% at top right, rgba(80, 80, 80, 0.45) 0%, #000000 70%)`,
            // }}
            style={{
              background: "rgba(157, 157, 157, .25)",

              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {isLoading && <p className="text-[#9E9E9E]">Loading services...</p>}
            {!isLoading && services.length === 0 && <p className="text-[#9E9E9E]">No services found</p>}
            {!isLoading && services.map((s) => (
              <div
                key={s.id}
                className="bg-[#1E1E1E]  py-4 px-3 rounded-3xl mb-2"
              >
                <div className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr_90px] gap-4 items-start px-4 py-3">
                  <div>
                    <p className="text-sm text-white mb-1 leading-none">
                      Service
                    </p>
                    <p className="text-lg font-normal text-white mt-2">
                      {s.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-white mb-1 leading-none">
                      Price
                    </p>
                    <p className="text-lg font-normal text-white mt-2">
                      {s.price ? `$${s.price}` : "Price not set"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-white mb-1 leading-none">
                      Duration
                    </p>
                    <p className="text-lg font-normal text-white mt-2">{s.duration}m</p>
                  </div>

                  <div className="flex flex-col items-start md:items-end">
                    <p className="text-sm text-white mb-1 leading-none">
                      Actions
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <button
                        onClick={() => handleEditClick(s)}
                        className="text-gray-400 cursor-pointer bg-[#D9D9D933] p-2 rounded-full flex items-center justify-center hover:text-gray-600 transition-colors"
                      >
                        <Pencil size={18} strokeWidth={1.8} />
                      </button>

                      <button
                        onClick={() => handleDeleteClick(s)}
                        className="text-gray-400 cursor-pointer bg-[#D9D9D933] p-2 rounded-full flex items-center justify-center hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={18} strokeWidth={1.8} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <AddServiceModal 
          isOpen={isAddModalOpen} 
          setIsOpen={setIsAddModalOpen}
          businessId={business?.id}
        />
        <EditServiceModal 
          isOpen={isEditModalOpen} 
          setIsOpen={setIsEditModalOpen}
          service={selectedService}
          businessId={business?.id}
        />
        <DeleteServiceModal
          isOpen={isDeleteModalOpen}
          setIsOpen={setIsDeleteModalOpen}
          onConfirm={handleConfirmDelete}
          isLoading={isDeleting}
        />
      </CommonWrapper>
    </div>
  );
}
