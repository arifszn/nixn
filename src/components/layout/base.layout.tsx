import { AppSidebar } from '@/components/layout/app-sidebar.layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Link, Outlet, useMatches } from 'react-router-dom';
import { RouteHandle } from '@/interfaces/route.interface';
import PageTitle from '@/components/common/page-title.common';
import { Fragment } from 'react/jsx-runtime';

const BaseLayout: React.FC = () => {
  const matches = useMatches();

  const routeHandle = matches[matches.length - 1].handle as RouteHandle;

  return (
    <>
      <PageTitle title={routeHandle.title} />
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  {routeHandle.breadcrumb?.map((item, index) => (
                    <Fragment key={item.title}>
                      <BreadcrumbItem
                        className={index === 0 ? 'hidden md:block' : ''}
                      >
                        {item.url ? (
                          <BreadcrumbLink asChild>
                            <Link to={item.url}>{item.title}</Link>
                          </BreadcrumbLink>
                        ) : (
                          item.title
                        )}
                      </BreadcrumbItem>
                      {index < routeHandle.breadcrumb.length - 1 && (
                        <BreadcrumbSeparator
                          className={index === 0 ? 'hidden md:block' : ''}
                        />
                      )}
                    </Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default BaseLayout;
